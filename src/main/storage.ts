const fs = require('fs');
const path = require('path');
import { TaskData } from './taskManager';

const dataDir = path.join(__dirname, '..', 'data');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Generic load function
function loadJSON(fileName: string, defaultData = {}) {
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return defaultData;
  }
}

// Generic save function
function saveJSON(fileName: string, data: JSON) {
  const filePath = path.join(dataDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Specific wrappers (optional, for convenience)
function loadPetData() {
  return loadJSON('pet.json', {
    hunger: 100,
    happiness: 100,
    energy: 100,
    health: 100,
    lastUpdated: new Date().toISOString()
  });
}

function savePetData(petData: JSON) {
  saveJSON('pet.json', petData);
}

function loadTasks() {
  return loadJSON('tasks.json', []);
}

function saveTasks(data: TaskData): void {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

export{
  loadPetData,
  savePetData,
  loadTasks,
  saveTasks
};
