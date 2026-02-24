import { app } from 'electron';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

interface DatabaseResult {
  success: boolean;
  filePath?: string;
  fileName?: string;
  tables?: {
    [tableName: string]: {
      rowCount: number;
      columns: Array<{ name: string; type: string; length: number }>;
      data: Array<Record<string, any>>;
    };
  };
  foundTables?: string[];
  missingTables?: string[];
  warning?: string;
  error?: string;
  type?: string;
}

export class DatabaseReader {
  private readonly REQUIRED_TABLES = [
    'temp00DwgLabel',
    'temp01selfuncsys1',
    'temp02seldsts-left-inputs1',
    'temp03selsrcs-right-outputs1',
  ];

  private getJavaHelperPath(): string {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'java-helper');
    }

    // Development – prefer project root
    let javaHelperPath = path.join(app.getAppPath(), 'java-helper');
    if (!existsSync(javaHelperPath)) {
      const projectRoot = path.join(__dirname, '../../..');
      javaHelperPath = path.join(projectRoot, 'java-helper');
    }

    console.log('Java helper path:', javaHelperPath);
    return javaHelperPath;
  }

  /**
   * Returns the path to the bundled Eclipse Temurin JRE java binary, or null
   * if the JRE has not been downloaded yet (e.g. first-run without postinstall).
   */
  private getBundledJavaBinary(): string | null {
    const javaHelperPath = this.getJavaHelperPath();
    const jreBin = path.join(javaHelperPath, 'jre', 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
    return existsSync(jreBin) ? jreBin : null;
  }

  /**
   * Returns the java executable to use.
   * Prefers the bundled JRE; falls back to system `java` if none is bundled.
   */
  private getJavaExecutable(): string {
    const bundled = this.getBundledJavaBinary();
    if (bundled) {
      console.log('Using bundled JRE:', bundled);
      return bundled;
    }
    console.warn('⚠️  Bundled JRE not found – falling back to system Java. Run `npm run download-jre` to bundle one.');
    return 'java';
  }

  /**
   * Sanity-check that the given java binary runs and reports a version.
   */
  private verifyJavaBinary(javaExe: string): Promise<{ ok: boolean; version?: string; error?: string }> {
    return new Promise((resolve) => {
      const proc = spawn(javaExe, ['-version']);
      let output = '';

      proc.stderr.on('data', (d) => { output += d.toString(); });
      proc.stdout.on('data', (d) => { output += d.toString(); });

      proc.on('close', (code) => {
        if (code === 0 || output.includes('version')) {
          const m = output.match(/version "([^"]+)"/);
          resolve({ ok: true, version: m ? m[1] : 'unknown' });
        } else {
          resolve({ ok: false, error: `Java binary check failed (${javaExe}): ${output}` });
        }
      });

      proc.on('error', (err) => {
        resolve({
          ok: false,
          error: `Cannot run Java (${javaExe}): ${err.message}. Run \`npm run download-jre\` to install the bundled JRE.`,
        });
      });
    });
  }

  private async checkJavaInstallation(): Promise<{ installed: boolean; version?: string; error?: string }> {
    return new Promise((resolve) => {
      const javaProcess = spawn('java', ['-version']);
      
      let output = '';
      
      javaProcess.stderr.on('data', (data) => {
        output += data.toString();
      });
      
      javaProcess.on('close', (code) => {
        if (code === 0 && output.includes('version')) {
          const versionMatch = output.match(/version "(.+?)"/);
          resolve({ 
            installed: true, 
            version: versionMatch ? versionMatch[1] : 'unknown' 
          });
        } else {
          resolve({ 
            installed: false, 
            error: 'Java Runtime Environment (JRE) is not installed or not in PATH' 
          });
        }
      });
      
      javaProcess.on('error', () => {
        resolve({ 
          installed: false, 
          error: 'Java Runtime Environment (JRE) is not installed' 
        });
      });
    });
  }

  private async checkJavacInstallation(): Promise<{ installed: boolean; error?: string }> {
    return new Promise((resolve) => {
      const javacProcess = spawn('javac', ['-version']);
      
      let output = '';
      
      javacProcess.stderr.on('data', (data) => {
        output += data.toString();
      });
      
      javacProcess.on('close', (code) => {
        if (code === 0 && output.includes('javac')) {
          resolve({ installed: true });
        } else {
          resolve({ 
            installed: false, 
            error: 'Java compiler (javac) is not installed. Please install JDK (Java Development Kit)' 
          });
        }
      });
      
      javacProcess.on('error', () => {
        resolve({ 
          installed: false, 
          error: 'Java compiler (javac) is not installed. Please install JDK (Java Development Kit)' 
        });
      });
    });
  }

  private async compileJavaHelper(): Promise<{ success: boolean; error?: string }> {
    const javaHelperPath = this.getJavaHelperPath();
    const classFile = path.join(javaHelperPath, 'AccessDBReader.class');
    
    console.log('Checking for compiled Java helper at:', classFile);
    
    // Check if already compiled - if yes, skip compilation entirely
    try {
      await fs.access(classFile);
      const stats = await fs.stat(classFile);
      console.log(`✅ Java helper already compiled (size: ${stats.size} bytes)`);
      return { success: true };
    } catch (err) {
      // Not compiled, need to compile
      console.log('❌ Java helper not found at:', classFile);
      console.log('Error:', err);
    }

    const sourceFile = path.join(javaHelperPath, 'AccessDBReader.java');
    const libPath = path.join(javaHelperPath, 'lib', '*');

    // Check if javac is available
    const javacCheck = await this.checkJavacInstallation();
    if (!javacCheck.installed) {
      return {
        success: false,
        error: 'Java compiler (javac) not found. Please run: cd java-helper && ./setup.sh',
      };
    }

    return new Promise((resolve) => {
      console.log('Compiling Java helper...');
      
      const javacProcess = spawn('javac', [
        '-cp',
        libPath,
        sourceFile,
      ], {
        cwd: javaHelperPath,
        env: { ...process.env }, // Pass full environment
      });

      let errorOutput = '';
      let stdOutput = '';

      javacProcess.stdout.on('data', (data) => {
        stdOutput += data.toString();
      });

      javacProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      javacProcess.on('close', (code) => {
        if (code === 0) {
          console.log('Java helper compiled successfully');
          resolve({ success: true });
        } else {
          resolve({ 
            success: false, 
            error: `Compilation failed: ${errorOutput || stdOutput}` 
          });
        }
      });

      javacProcess.on('error', (err) => {
        resolve({ 
          success: false, 
          error: `Failed to run javac: ${err.message}. Please run: cd java-helper && ./setup.sh` 
        });
      });
    });
  }

  async readAccessDatabase(accdbPath: string): Promise<DatabaseResult> {
    try {
      const javaExe = this.getJavaExecutable();

      // Verify the java binary works (whether bundled or system)
      const javaCheck = await this.verifyJavaBinary(javaExe);
      if (!javaCheck.ok) {
        return {
          success: false,
          error:
            javaCheck.error ||
            'Java runtime not available. Run `npm run download-jre` or install Java manually.',
          type: 'JavaNotFound',
        };
      }

      console.log(`Java detected (${javaCheck.version}): ${javaExe}`);

      // ClassFile should always be present (bundled with app); log a warning if missing
      const javaHelperPath = this.getJavaHelperPath();
      const classFile = path.join(javaHelperPath, 'AccessDBReader.class');
      if (!existsSync(classFile)) {
        console.warn('⚠️  AccessDBReader.class not found at', classFile);
        return {
          success: false,
          error: 'AccessDBReader.class is missing. Please rebuild the project.',
          type: 'CompilationError',
        };
      }

      // Create temp output file
      const tempDir = os.tmpdir();
      const outputJsonPath = path.join(tempDir, `db-output-${Date.now()}.json`);

      // Build classpath and run Java helper
      const libPath = path.join(javaHelperPath, 'lib', '*');
      const classpath = `${javaHelperPath}${path.delimiter}${libPath}`;

      console.log('Reading database with Java helper...');
      console.log('Classpath:', classpath);
      console.log('ACCDB Path:', accdbPath);

      const result = await this.executeJavaHelper(javaExe, classpath, accdbPath, outputJsonPath);

      // 5. Read and parse the output JSON
      const jsonContent = await fs.readFile(outputJsonPath, 'utf-8');
      const data: DatabaseResult = JSON.parse(jsonContent);

      // 6. Clean up temp file
      try {
        await fs.unlink(outputJsonPath);
      } catch (err) {
        console.warn('Failed to delete temp file:', err);
      }

      // 7. Log table information to console
      if (data.success && data.tables) {
        console.log('\n=== DATABASE READ SUCCESSFUL ===');
        console.log(`File: ${data.fileName}`);
        console.log(`Found tables: ${data.foundTables?.join(', ')}`);
        
        if (data.missingTables && data.missingTables.length > 0) {
          console.log(`Missing tables: ${data.missingTables.join(', ')}`);
        }

        // Log each table's data
        // for (const tableName of this.REQUIRED_TABLES) {
        //   if (data.tables[tableName]) {
        //     const tableData = data.tables[tableName];
        //     console.log(`\n--- Table: ${tableName} ---`);
        //     console.log(`Rows: ${tableData.rowCount}`);
        //     console.log(`Columns: ${tableData.columns.map(c => c.name).join(', ')}`);
        //     console.log('Sample data (first 3 rows):');
        //     console.log(JSON.stringify(tableData.data.slice(0, 3), null, 2));
        //   }
        // }
        console.log('\n==============================\n');
      }

      return data;

    } catch (error) {
      console.error('Error reading database:', error);
      return {
        success: false,
        error: (error as Error).message,
        type: 'UnknownError',
      };
    }
  }

  private executeJavaHelper(
    javaExe: string,
    classpath: string,
    accdbPath: string,
    outputPath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const javaProcess = spawn(
        javaExe,
        [
          '-cp',
          classpath,
          'AccessDBReader',
          accdbPath,
          outputPath,
        ],
        {
          cwd: this.getJavaHelperPath(),
        }
      );

      let stdout = '';
      let stderr = '';

      javaProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        console.log('Java output:', data.toString());
      });

      javaProcess.stderr.on('data', (data) => {
        stderr += data.toString();
        console.error('Java error:', data.toString());
      });

      javaProcess.on('close', (code) => {
        if (code === 0 || stdout.includes('SUCCESS')) {
          resolve();
        } else {
          reject(new Error(`Java helper failed (code ${code}): ${stderr || stdout}`));
        }
      });

      javaProcess.on('error', (err) => {
        reject(new Error(`Failed to execute Java helper: ${err.message}`));
      });
    });
  }

  async validateFile(filePath: string): Promise<{ valid: boolean; error?: string }> {
    try {
      const stats = await fs.stat(filePath);
      
      if (!stats.isFile()) {
        return { valid: false, error: 'Path is not a file' };
      }

      const ext = path.extname(filePath).toLowerCase();
      if (ext !== '.accdb' && ext !== '.mdb') {
        return { 
          valid: false, 
          error: 'File must be an Access database (.accdb)' 
        };
      }
      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: `File access error: ${(error as Error).message}` 
      };
    }
  }
}

export const databaseReader = new DatabaseReader();
