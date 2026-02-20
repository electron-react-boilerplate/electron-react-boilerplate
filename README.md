# 📄 Wiring Diagram Generator - Electron + React Application

> A professional cross-platform application for generating wiring diagram PDFs from Microsoft Access databases with precise coordinate labeling and automatic layout management.

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [📊 Database Structure](#-database-structure)
- [🎨 Wiring Diagram Layout](#-wiring-diagram-layout)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🔧 Technical Details](#-technical-details)
- [🐛 Troubleshooting](#-troubleshooting)
- [📦 Production Build](#-production-build)

---

## 🎯 Overview

This application generates professional landscape-oriented wiring diagram PDFs (17" × 11") from Microsoft Access database files. The system reads structured data from three database tables and automatically creates detailed wiring diagrams with:

### ✨ Key Features
- **Cross-platform support** (Linux, macOS, Windows)
- **Microsoft Access database integration** (.accdb and .mdb files)
- **Automatic layout generation** with intelligent component positioning
- **PDF generation** with precise coordinate labeling
- **Real-time preview** with zoom controls
- **Database table viewer** for data verification
- **Multi-page support** for large systems

### 📐 Layout Specifications
- **Page size**: 17" × 11" landscape
- **Main box**: 20pt label + 6pt safe zone margins
- **Three vertical lines**: 1.25", 8.75", 16.375" from left edge
- **Coordinate labels**: Top and bottom positioning with overflow prevention
- **Corner labels**: Page boundaries (0,0), (17,0), (0,11), (17,11)
- **System info**: Vertical text (System Name | Date | Page Number)

---

## 🏗️ Architecture

### 🔄 Data Flow
```
┌─────────────────────────────────────────────────────────────┐
│                     ELECTRON APP                           │
│                                                             │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Main Process    │ ◄─IPC─► │ Renderer Process │         │
│  │  (Node.js)       │         │   (React)        │         │
│  │                  │         │                  │         │
│  │  • main.ts       │         │  • App.tsx       │         │
│  │  • pdfGenerator  │         │  • Components    │         │
│  │  • databaseReader│         │  • UI State      │         │
│  └──────────────────┘         └──────────────────┘         │
│           ▲                                             │
│           │                                             │
│           ▼                                             │
│  ┌──────────────────┐                                  │
│  │  preload.ts      │                                  │
│  │  (Security Bridge)│                                  │
│  └──────────────────┘                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    JAVA HELPER                             │
│  • AccessDBReader.java                                     │
│  • Jackcess Library                                        │
│  • Reads .accdb/.mdb files                                 │
└─────────────────────────────────────────────────────────────┘
```

### 📊 Complete Workflow
1. **User uploads database** → File dialog opens (.accdb/.mdb filter)
2. **Electron validates file** → Checks file type and existence
3. **Java helper executes** → Reads Access database using Jackcess library
4. **Data extracted to JSON** → Temporary JSON file created
5. **Electron parses JSON** → Loads into React state
6. **UI displays data** → Table view and PDF generation options
7. **PDF generated** → Wiring diagram created with precise layout
8. **Preview displayed** → Interactive PDF viewer with zoom controls

---

## 📊 Database Structure

The system reads three specific tables from your Microsoft Access database:

### 📋 Table: `temp01selfuncsys1`
**Purpose**: System definitions and metadata
```typescript
interface SystemData {
  systemName: string;      // System identifier (e.g., "RTR-01", "SYS-002")
  location?: string;       // Physical location (e.g., "RACK-A", "ROOM-101")
  frameName?: string;      // Frame name for display
  inputs?: number;         // Number of input connections
  outputs?: number;        // Number of output connections
}
```

### 📋 Table: `temp02seldsts-left-inputs1`
**Purpose**: Input connections (left side of diagram)
```typescript
interface InputConnection {
  systemName_dst: string;  // Destination system (matches temp01.systemName)
  systemName_src: string;  // Source system
  portName_src: string;    // Source port name
  portNumber_src: string;  // Source port number
  signalName_src: string;  // Signal name
  cableId: string;         // Cable identifier
}
```

### 📋 Table: `temp03selsrcs-right-outputs1`
**Purpose**: Output connections (right side of diagram)
```typescript
interface OutputConnection {
  systemName_src: string;  // Source system (matches temp01.systemName)
  systemName_dst: string;  // Destination system
  portName_dst: string;    // Destination port name
  portNumber_dst: string;  // Destination port number
  signalName_dst: string;  // Signal name
  cableId: string;         // Cable identifier
}
```

### 📋 Table: `temp00DwgLabel` (Optional)
**Purpose**: Drawing label information
```typescript
interface DrawingLabel {
  FuncSysName: string;     // Functional system name for PDF header
}
```

---

## 🎨 Wiring Diagram Layout

### 📐 Layout Coordinates System

The wiring diagram uses a precise coordinate system based on the 17" × 11" page:

#### **Vertical Lines**
```
Line 1: 1.25"   (90pt)   - Left column start
Line 2: 8.75"   (630pt)  - Center divider
Line 3: 16.375" (1179pt) - Right edge
```

#### **Column Layout**
```
┌─────────────────────────────────────────────────────────────┐
│                    17" WIDTH (1224pt)                      │
├─────────────┬─────────────────────┬─────────────────────────┤
│   LEFT      │      CENTER         │        RIGHT            │
│   COLUMN    │      DIVIDER        │        COLUMN           │
│  (1.25")    │      (8.75")        │       (16.375")         │
│             │                     │                         │
│  RTR-01     │    ┌──────────┐     │    Other Systems       │
│  Special    │    │ System   │     │    (Alphabetical)      │
│  Systems    │    │  Block   │     │                         │
│             │    └──────────┘     │    ┌──────────┐        │
│  ┌──────┐   │                     │    │ System   │        │
│  │Input │   │                     │    │  Block   │        │
│  │Bubble│   │                     │    └──────────┘        │
│  └──────┘   │                     │                         │
└─────────────┴─────────────────────┴─────────────────────────┘
```

#### **Component Dimensions**
```typescript
// Layout constants (in inches/points)
INPUT_BUBBLE_WIDTH = 1.7"     (122pt)
INPUT_BUBBLE_HEIGHT = 0.125"   (9pt)
SYSTEM_BLOCK_WIDTH = 1.5"      (108pt)
OUTPUT_BUBBLE_WIDTH = 1.7"     (122pt)
CABLE_ID_BOX_WIDTH = 0.625"    (45pt)
ROW_HEIGHT = 0.125"            (9pt)
```

### 🎯 Special System Placement

**RTR-01** (and other special systems) are placed on the **LEFT side** of the diagram:

```typescript
// Systems placed on LEFT side (at x = 1.25")
SPECIAL_SYSTEMS = ['RTR-01', 'RTR01'];

// All other systems placed on RIGHT side (at x = 9.0")
// and sorted alphabetically
```

### 📊 Component Flow

Each system block contains:
1. **Header Section**
   - System name (Arial 7pt)
   - Frame name (Arial 7pt)
   - Location (Arial 6pt)

2. **Input Side (Left)**
   - Input bubbles with port names
   - Connection lines to system block
   - Cable ID boxes

3. **System Block (Center)**
   - Port names listed inside
   - Sorted by port number

4. **Output Side (Right)**
   - Output bubbles with port names
   - Connection lines from system block
   - Cable ID boxes

### 🔄 Connection Logic

```typescript
// Input connections: temp02 → system block
systemName_dst (temp02) === systemName (temp01)

// Output connections: system block → temp03
systemName_src (temp03) === systemName (temp01)

// Continuation detection:
// If source/destination matches another system in temp01,
// draw connection line instead of bubble
```

---

## 🚀 Installation

### 📋 Prerequisites
- **Node.js** (v16 or higher)
- **Java Runtime Environment (JRE)** or **Java Development Kit (JDK)**
- **npm** or **yarn**

### 🔧 Step 1: Install Java

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install default-jre default-jdk
```

**macOS:**
```bash
brew install openjdk
```

**Windows:**
- Download from [java.com](https://www.java.com/) or [Adoptium](https://adoptium.net/)

Verify installation:
```bash
java -version
javac -version
```

### 🔧 Step 2: Setup Java Helper

```bash
cd java-helper
./setup.sh
cd ..
```

This script:
- ✅ Checks Java installation
- ✅ Downloads required JAR libraries (Jackcess, JSON-Java, etc.)
- ✅ Compiles the Java helper
- ✅ Verifies everything works

### 🔧 Step 3: Install Node Dependencies

```bash
npm install
```

### 🔧 Step 4: Start the Application

```bash
npm start
```

The application will open in a new window.

---

## 💻 Usage

### 📁 1. Upload Database File

1. Click **"📁 Upload Database File (.accdb)"** button
2. Select your Microsoft Access database file
3. Wait for processing (you'll see detailed logs in the console)

**Expected Console Output:**
```
=== DATABASE READ SUCCESSFUL ===
File: your-database.accdb
Found tables: temp01selfuncsys1, temp02seldsts-left-inputs1, temp03selsrcs-right-outputs1

--- Table: temp01selfuncsys1 ---
Rows: 25
Columns: systemName, location, frameName, inputs, outputs
Sample data (first 3 rows):
[
  { "systemName": "RTR-01", "location": "RACK-A", "frameName": "RTR-01", "inputs": 5, "outputs": 3 },
  { "systemName": "SYS-002", "location": "RACK-B", "frameName": "SYS-002", "inputs": 2, "outputs": 4 },
  ...
]
```

### 📊 2. View Database Tables

- Click **"Database Tables"** tab
- Browse through all three tables
- Verify data integrity before PDF generation

### 📄 3. Generate Wiring Diagram

1. Click **"PDF Preview"** tab
2. The wiring diagram generates automatically
3. Use zoom controls to inspect the diagram:
   - **Zoom In/Out**: 50% to 200%
   - **Reset Zoom**: Return to 100%
   - **Export PDF**: Save to your Documents folder

### 🎨 4. Understanding the Output

The generated PDF includes:
- **Precise coordinate labels** at top and bottom
- **Three vertical layout lines** at exact positions
- **System blocks** with input/output connections
- **Connection bubbles** for external systems
- **Cable ID labels** for each connection
- **System information** in vertical text

---

## 📁 Project Structure

```
wiring-diagram/
├── 📁 src/
│   ├── 📁 main/                    # Electron main process
│   │   ├── 📄 main.ts             # IPC handlers and app lifecycle
│   │   ├── 📄 preload.ts          # Security bridge between processes
│   │   ├── 📄 menu.ts             # Application menu
│   │   └── 📁 services/
│   │       ├── 📄 pdfGenerator.ts        # Base PDF layout generation
│   │       ├── 📄 wiringDiagramGenerator.ts # Wiring diagram logic
│   │       └── 📄 databaseReader.ts      # Database reading service
│   │
│   └── 📁 renderer/                # React frontend
│       ├── 📄 App.tsx             # Main application component
│       ├── 📄 App.css             # Application styles
│       ├── 📁 components/
│       │   ├── 📄 PDFPreview.tsx  # PDF viewer with zoom controls
│       │   └── 📄 DatabaseTables.tsx # Database table viewer
│       └── 📄 index.tsx           # React entry point
│
├── 📁 java-helper/                 # Java database reader
│   ├── 📄 AccessDBReader.java     # Main Java class
│   ├── 📄 setup.sh                # Automated setup script
│   ├── 📁 lib/                    # JAR dependencies
│   │   ├── 📄 jackcess-4.0.5.jar
│   │   ├── 📄 json-20231013.jar
│   │   ├── 📄 commons-logging-1.2.jar
│   │   └── 📄 commons-lang3-3.12.0.jar
│   └── 📄 README.md               # Java helper documentation
│
├── 📁 project-context/             # Documentation
│   ├── 📄 ARCHITECTURE.md         # Technical architecture
│   ├── 📄 DATABASE_SETUP.md       # Database setup guide
│   ├── 📄 IMPLEMENTATION_SUMMARY.md # Implementation details
│   └── 📄 UI_FEATURES.md          # UI component documentation
│
├── 📄 package.json                # Node dependencies and scripts
├── 📄 tsconfig.json               # TypeScript configuration
└── 📄 README.md                   # This file
```

---

## 🔧 Technical Details

### 🛡️ Security Model

The application uses Electron's secure IPC model:
```
Renderer Process ──► preload.ts ──► Main Process
      (React)         (Security      (Node.js)
                      Bridge)
```

- **preload.ts** acts as a secure bridge
- **No direct Node.js access** from renderer
- **Validated IPC channels** only

### 📡 IPC Channels

| Channel | Purpose | Direction |
|---------|---------|-----------|
| `select-database-file` | Open file dialog | Renderer → Main |
| `read-database` | Read Access database | Renderer → Main |
| `generate-pdf` | Create wiring diagram PDF | Renderer → Main |
| `read-pdf-file` | Load PDF for preview | Renderer → Main |
| `open-pdf` | Open PDF in system viewer | Renderer → Main |

### 🎨 PDF Generation Process

```typescript
// 1. Base Layout (pdfGenerator.ts)
- Draw 17" × 11" page with margins
- Add three vertical lines at precise coordinates
- Add coordinate labels with overflow prevention
- Add corner labels and vertical system text

// 2. Wiring Diagram (wiringDiagramGenerator.ts)
- Process database tables into system blocks
- Calculate optimal layout (left/right columns)
- Draw system blocks with headers and content
- Add input/output bubbles and connections
- Handle multi-page if content exceeds page height
```

### 📐 Layout Algorithms

#### **System Placement**
```typescript
// Special systems (RTR-01) → Left column
if (SPECIAL_SYSTEMS.includes(systemName)) {
  x = LEFT_COLUMN_X; // 1.25"
}

// All other systems → Right column (alphabetical)
else {
  x = RIGHT_COLUMN_X; // 9.0"
  sortAlphabetically();
}
```

#### **Height Calculation**
```typescript
// Dynamic height based on connections
const maxConnections = Math.max(inputs.length, outputs.length);
const contentHeight = maxConnections * ROW_HEIGHT;
const totalHeight = HEADER_HEIGHT + contentHeight + (2 * CONTENT_PADDING);
```

#### **Multi-Page Detection**
```typescript
// Check if content fits in single page
if (totalHeight > maxHeight) {
  return generateMultiPageWiringDiagram();
}
```

### 🔌 Database Integration

The Java helper uses the **Jackcess** library:
- **Cross-platform** Access database reading
- **Supports both .mdb and .accdb** formats
- **Pure Java implementation** - no native dependencies
- **Apache 2.0 licensed** open source

#### **Java Helper Flow**
```java
1. Open .accdb file with Jackcess
2. Read three specific tables
3. Convert to JSON structure
4. Write to temporary file
5. Exit with success/error code
```

---

## 🐛 Troubleshooting

### ❌ "Java is not installed"
**Solution**: Install Java JRE/JDK as shown in [Installation](#-installation)

### ❌ "Compilation failed"
**Solution**: Ensure JDK (not just JRE) is installed:
```bash
sudo apt install default-jdk  # Linux
brew install openjdk          # macOS
```

### ❌ "ClassNotFoundException: AccessDBReader"
**Solution**: Re-run setup script:
```bash
cd java-helper
./setup.sh
```

### ❌ "Table not found in database"
**Solution**: Verify your database contains:
- `temp01selfuncsys1`
- `temp02seldsts-left-inputs1`
- `temp03selsrcs-right-outputs1`

### ❌ PDF generation fails
**Check console logs for**:
- Database structure validation
- System name matching between tables
- Coordinate calculation errors

### 🔍 Testing Java Helper Manually
```bash
cd java-helper
java -cp ".:lib/*" AccessDBReader ../test.accdb output.json
cat output.json
```

---

## 📦 Production Build

### 🏗️ Build for Distribution

```bash
npm run package
```

### 📋 Production Dependencies

The `package.json` includes Java helper in extra resources:
```json
{
  "build": {
    "extraResources": [
      {
        "from": "java-helper",
        "to": "java-helper",
        "filter": ["**/*"]
      }
    ]
  }
}
```

### 🎯 Platform-Specific Builds

**Linux:**
```bash
npm run package:linux
# Generates: .AppImage, .deb
```

**macOS:**
```bash
npm run package:mac
# Generates: .dmg, .zip
```

**Windows:**
```bash
npm run package:win
# Generates: .nsis, .portable
```

### 📦 Bundling JRE (Optional)

To avoid requiring users to install Java:

1. **Download JRE** for each platform from [Adoptium](https://adoptium.net/)
2. **Bundle with application**:
```json
{
  "extraResources": [
    {
      "from": "jre/linux",
      "to": "jre",
      "filter": ["**/*"]
    }
  ]
}
```
3. **Update databaseReader.ts** to use bundled JRE

---

## 🎯 Key Concepts Summary

### 📐 **Layout Definition (17" × 11")**
- **Three vertical lines** at 1.25", 8.75", 16.375"
- **Left column** for special systems (RTR-01)
- **Right column** for all other systems (alphabetical)
- **Precise coordinate labeling** with overflow prevention

### 🔄 **Three Vertical Lines System**
1. **Line 1 (1.25")**: Left column start for special systems
2. **Line 2 (8.75")**: Center divider between columns
3. **Line 3 (16.375")**: Right edge boundary

### 🫧 **Input Bubbles**
- **Left side** of system blocks
- **Connected from** temp02 table data
- **Show source system** and port information
- **Include cable ID** for traceability

### 📦 **System Blocks**
- **Central component** for each system
- **Header**: System name, frame name, location
- **Content**: Port names in vertical list
- **Dynamic height** based on connection count

### 🫧 **Output Bubbles**
- **Right side** of system blocks
- **Connected to** temp03 table data
- **Show destination system** and port information
- **Include cable ID** for traceability

### 🗄️ **Database Read System**
- **temp01selfuncsys1**: System definitions
- **temp02seldsts-left-inputs1**: Input connections
- **temp03selsrcs-right-outputs1**: Output connections
- **temp00DwgLabel**: Drawing labels (optional)

### 🎨 **Each Line Explained**
1. **Layout coordinates** define the 17" × 11" canvas
2. **Three vertical lines** create the column structure
3. **Input bubbles** show incoming connections
4. **System blocks** display the central systems
5. **Output bubbles** show outgoing connections
6. **Database integration** provides all connection data
7. **PDF generation** creates the final professional output

---

## 📞 Support

For issues and questions:
1. **Check console logs** for detailed error messages
2. **Verify Java installation**: `java -version`
3. **Re-run setup**: `cd java-helper && ./setup.sh`
4. **Check database structure** for required tables
5. **Review this README** for troubleshooting steps

---

## 📜 License

This project uses open-source libraries with permissive licenses:
- **Electron**: MIT License
- **React**: MIT License
- **PDFKit**: MIT License
- **Jackcess**: Apache 2.0 License
- **TypeScript**: Apache 2.0 License

---

**🎉 The Wiring Diagram Generator is ready to use!**

Upload your Access database and generate professional wiring diagrams with precise coordinate labeling and automatic layout management.

## Sponsors

<a href="https://palette.dev">
  <img src=".erb/img/palette-sponsor-banner.svg" width="100%" />
</a>

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/electron-react-boilerplate-594#backer)]

<a href="https://opencollective.com/electron-react-boilerplate-594/backer/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/backer/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/electron-react-boilerplate-594-594#sponsor)]

<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate-594/sponsor/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate-594/sponsor/29/avatar.svg"></a>

## Maintainers

- [Amila Welihinda](https://github.com/amilajack)
- [John Tran](https://github.com/jooohhn)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
