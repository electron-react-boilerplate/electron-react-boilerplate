/**
 * download-jre.js
 * Downloads a platform-specific JRE (Eclipse Temurin) into java-helper/jre/
 * so the app can run Java without any manual installation by the end user.
 *
 * Run automatically via `postinstall` in package.json.
 * Safe to re-run: skips download if JRE binary already exists.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// ─── Config ──────────────────────────────────────────────────────────────────
const JRE_MAJOR_VERSION = '21'; // LTS release
const JRE_DIR = path.join(__dirname, '..', 'java-helper', 'jre');
// ─────────────────────────────────────────────────────────────────────────────

function getPlatformInfo() {
  const platformMap = { win32: 'windows', darwin: 'mac', linux: 'linux' };
  const archMap = { x64: 'x64', arm64: 'aarch64', arm: 'arm' };

  const jreOs = platformMap[process.platform];
  const jreArch = archMap[process.arch] || 'x64';
  const ext = process.platform === 'win32' ? 'zip' : 'tar.gz';

  if (!jreOs) {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }

  return { jreOs, jreArch, ext };
}

function getJavaBinaryPath() {
  return process.platform === 'win32'
    ? path.join(JRE_DIR, 'bin', 'java.exe')
    : path.join(JRE_DIR, 'bin', 'java');
}

/**
 * Follow redirects and download a URL to a local file.
 */
function downloadToFile(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 15) {
      return reject(new Error('Too many HTTP redirects'));
    }

    const client = url.startsWith('https://') ? https : http;

    client
      .get(url, (res) => {
        // Handle redirects (301, 302, 307, 308)
        if ([301, 302, 307, 308].includes(res.statusCode)) {
          const location = res.headers.location;
          res.resume(); // drain response
          return downloadToFile(location, dest, redirects + 1)
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          res.resume();
          return reject(
            new Error(`HTTP ${res.statusCode} while downloading ${url}`)
          );
        }

        const total = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;
        let lastPct = -1;

        const file = fs.createWriteStream(dest);

        res.on('data', (chunk) => {
          downloaded += chunk.length;
          if (total > 0) {
            const pct = Math.floor((downloaded / total) * 100);
            if (pct !== lastPct && pct % 10 === 0) {
              process.stdout.write(`\r  ${pct}% (${Math.round(downloaded / 1e6)} MB)`);
              lastPct = pct;
            }
          }
        });

        res.pipe(file);

        file.on('finish', () => {
          console.log(); // newline after progress
          file.close(resolve);
        });

        file.on('error', (err) => {
          fs.unlink(dest, () => {}); // cleanup
          reject(err);
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

/**
 * Extract tar.gz on Linux/macOS using system `tar`.
 */
function extractTarGz(archivePath, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  // --strip-components=1 removes the top-level directory inside the archive
  execSync(`tar -xzf "${archivePath}" -C "${targetDir}" --strip-components=1`, {
    stdio: 'inherit',
  });
}

/**
 * Extract zip on Windows using PowerShell.
 */
function extractZipWindows(archivePath, targetDir) {
  const tmpExtract = path.join(os.tmpdir(), `jre-extract-${Date.now()}`);

  execSync(
    `powershell -NoProfile -Command "Expand-Archive -LiteralPath '${archivePath}' -DestinationPath '${tmpExtract}' -Force"`,
    { stdio: 'inherit' }
  );

  // The zip contains a single top-level folder – move its contents to targetDir
  const entries = fs.readdirSync(tmpExtract);
  if (entries.length !== 1) {
    throw new Error(`Unexpected zip structure: ${entries.join(', ')}`);
  }

  const extracted = path.join(tmpExtract, entries[0]);
  fs.mkdirSync(targetDir, { recursive: true });

  // xcopy preserves structure; robocopy is more reliable for deep trees
  execSync(`robocopy "${extracted}" "${targetDir}" /E /NFL /NDL /NJH /NJS /nc /ns /np`, {
    stdio: 'inherit',
  });

  // Cleanup tmp dir
  fs.rmSync(tmpExtract, { recursive: true, force: true });
}

async function main() {
  // ── Already present? ──────────────────────────────────────────────────────
  const javaBin = getJavaBinaryPath();
  if (fs.existsSync(javaBin)) {
    console.log('✅ Bundled JRE already present — skipping download.');
    return;
  }

  // ── Wrong-platform JRE present (e.g. Linux JRE copied to Windows machine) ─
  // Clean it out so the correct platform JRE can be extracted cleanly.
  if (fs.existsSync(JRE_DIR)) {
    console.log(`🧹 Removing existing JRE (wrong platform) from ${JRE_DIR} …`);
    fs.rmSync(JRE_DIR, { recursive: true, force: true });
  }

  const { jreOs, jreArch, ext } = getPlatformInfo();

  // Eclipse Temurin API — returns the binary directly (after redirect)
  const downloadUrl =
    `https://api.adoptium.net/v3/binary/latest/${JRE_MAJOR_VERSION}/ga` +
    `/${jreOs}/${jreArch}/jre/hotspot/normal/eclipse`;

  console.log(`\n📦 Downloading Eclipse Temurin JRE ${JRE_MAJOR_VERSION} (${jreOs}/${jreArch})…`);
  console.log(`   from: ${downloadUrl}\n`);

  const archivePath = path.join(os.tmpdir(), `temurin-jre.${ext}`);

  try {
    await downloadToFile(downloadUrl, archivePath);

    console.log('📂 Extracting JRE…');
    if (ext === 'tar.gz') {
      extractTarGz(archivePath, JRE_DIR);
    } else {
      extractZipWindows(archivePath, JRE_DIR);
    }

    // Cleanup archive
    fs.unlinkSync(archivePath);

    if (!fs.existsSync(javaBin)) {
      throw new Error(`Extraction appeared to succeed but java binary not found at: ${javaBin}`);
    }

    // Ensure executable on Linux/macOS
    if (process.platform !== 'win32') {
      fs.chmodSync(javaBin, 0o755);
    }

    console.log(`\n✅ JRE installed → ${JRE_DIR}`);
  } catch (err) {
    // Clean up partial extraction
    if (fs.existsSync(JRE_DIR)) {
      fs.rmSync(JRE_DIR, { recursive: true, force: true });
    }
    if (fs.existsSync(archivePath)) {
      fs.unlinkSync(archivePath);
    }
    console.error('\n❌ Failed to download/extract JRE:', err.message);
    console.error(
      '   The app will fall back to the system Java (if installed).\n' +
        '   Re-run `npm install` or `node scripts/download-jre.js` to retry.'
    );
    // Exit 0 so `npm install` does NOT fail entirely
    process.exit(0);
  }
}

main();
