/* eslint-disable no-console */
const { exec } = require('child_process');

function getOpenWindows() {
  const script = `
    tell application "System Events"
      set activeWindowList to {}
      repeat with appProc in (processes where background only is false)
        repeat with win in windows of appProc
          set winProperties to properties of win
          set appName to name of appProc
          set end of activeWindowList to {AppName:appName, properties:winProperties}
        end repeat
      end repeat
    end tell

    activeWindowList
  `;

  const command = `osascript -e '${script}'`;

  exec(command, function (error, stdout, stderr) {
    return stdout;
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
}

function openApplicationByURL(url) {
  const script = `
    set theURL to "${url}"
    open location theURL
  `;

  const command = `osascript -e '${script}'`;

  try {
    exec(command);
    console.log(`Opened URL: ${url}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

function openFile(filePath) {
  // Adjust the command based on the operating system
  const command = process.platform === 'win32' ? `start "" "${filePath}"` : `open "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening file: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error opening file: ${stderr}`);
      return;
    }
    console.log(`File opened successfully: ${filePath}`);
  });
}

function quitApplicationByName(app) {
  const script = `
  tell application "${app}"
  quit
  end tell
  `;

  const command = `osascript -e '${script}'`;

  try {
    exec(command);
    console.log(`Closed app: ${app}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// openFile('/Users/tuomaskivioja/Documents/Make a List1.xlsx');
// quitApplicationByName('Notion');
// openApplicationByURL('https://www.notion.so/Most-important-ones-c36b8a94eb7e40e38f7205b84ec2dc01')
// const activeWindows = getOpenWindows();
// console.log(activeWindows);

module.exports = {
  getOpenWindows: getOpenWindows,
  quitApplicationByName: quitApplicationByName,
  openFile: openFile,
  openApplicationByURL: openApplicationByURL
};
