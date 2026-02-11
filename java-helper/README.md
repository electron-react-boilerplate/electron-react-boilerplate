# Java Helper for Access Database Reading

This directory contains the Java-based helper for reading Microsoft Access (.accdb and .mdb) database files in a cross-platform manner.

## 📋 Prerequisites

### 1. Java Runtime Environment (JRE)
The application requires Java 8 or higher to be installed on your system.

#### Installation Instructions:

**Ubuntu/Debian Linux:**
```bash
sudo apt update
sudo apt install default-jre
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install java-latest-openjdk
```

**macOS:**
```bash
# Using Homebrew
brew install openjdk

# Or download from: https://adoptium.net/
```

**Windows:**
- Download from [java.com](https://www.java.com/)
- Or use [Adoptium OpenJDK](https://adoptium.net/)

#### Verify Installation:
```bash
java -version
```

Expected output should show Java version 8 or higher.

## 📦 Required JAR Libraries

Download the following libraries and place them in the `lib/` directory:

### 1. **Jackcess** (Required)
- **Purpose:** Core library for reading Access databases
- **Download:** https://jackcess.sourceforge.io/
- **Maven Central:** https://repo1.maven.org/maven2/com/healthmarketscience/jackcess/jackcess/
- **Recommended Version:** 4.0.5 or later
- **File:** `jackcess-4.0.5.jar`

### 2. **JSON-Java** (Required)
- **Purpose:** JSON handling for output
- **Download:** https://github.com/stleary/JSON-java
- **Maven Central:** https://repo1.maven.org/maven2/org/json/json/
- **Recommended Version:** 20231013 or later
- **File:** `json-20231013.jar`

### 3. **Commons Logging** (Required by Jackcess)
- **Purpose:** Logging dependency for Jackcess
- **Maven Central:** https://repo1.maven.org/maven2/commons-logging/commons-logging/
- **Recommended Version:** 1.2 or later
- **File:** `commons-logging-1.2.jar`

### 4. **Commons Lang** (Required by Jackcess)
- **Purpose:** Utility functions used by Jackcess
- **Maven Central:** https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/
- **Recommended Version:** 3.12.0 or later
- **File:** `commons-lang3-3.12.0.jar`

## 📁 Directory Structure

```
java-helper/
├── AccessDBReader.java       # Main Java source file
├── AccessDBReader.class       # Compiled class (auto-generated)
├── README.md                  # This file
├── setup.sh                   # Automated setup script
└── lib/                       # JAR libraries directory
    ├── jackcess-4.0.5.jar
    ├── json-20231013.jar
    ├── commons-logging-1.2.jar
    └── commons-lang3-3.12.0.jar
```

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

Run the provided setup script:

```bash
cd java-helper
chmod +x setup.sh
./setup.sh
```

This script will:
1. Check if Java is installed
2. Create the `lib/` directory
3. Download required JAR files automatically
4. Compile the Java helper

### Option 2: Manual Setup

1. **Create lib directory:**
```bash
cd java-helper
mkdir -p lib
```

2. **Download JAR files:**

```bash
cd lib

# Download Jackcess
wget https://repo1.maven.org/maven2/com/healthmarketscience/jackcess/jackcess/4.0.5/jackcess-4.0.5.jar

# Download JSON-Java
wget https://repo1.maven.org/maven2/org/json/json/20231013/json-20231013.jar

# Download Commons Logging
wget https://repo1.maven.org/maven2/commons-logging/commons-logging/1.2/commons-logging-1.2.jar

# Download Commons Lang
wget https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.12.0/commons-lang3-3.12.0.jar
```

3. **Compile the Java helper:**
```bash
cd ..
javac -cp "lib/*" AccessDBReader.java
```

## 🧪 Testing

Test the Java helper manually:

```bash
# From the java-helper directory
java -cp ".:lib/*" AccessDBReader /path/to/your/database.accdb output.json

# Check the output
cat output.json
```

## 🔧 How It Works

1. **User clicks "Upload Database File" in the Electron app**
2. **File dialog opens** for .accdb or .mdb file selection
3. **Electron main process** calls the Java helper:
   ```
   java -cp ".:lib/*" AccessDBReader input.accdb output.json
   ```
4. **Java helper reads the database** and extracts:
   - `temp01selfuncsys1`
   - `temp02seldsts-left-inputs1`
   - `temp03selsrcs-right-outputs1`
5. **Output is written to JSON file**
6. **Electron reads the JSON** and displays the results
7. **Console logs** show table data for verification

## 📝 Troubleshooting

### Error: "Java is not installed"
- Install Java JRE as described in Prerequisites section
- Verify with `java -version`
- Make sure Java is in your PATH

### Error: "Compilation failed"
- Ensure all JAR files are in the `lib/` directory
- Check that you have Java Development Kit (JDK) installed:
  ```bash
  javac -version
  ```
- If only JRE is installed, install JDK:
  - Ubuntu: `sudo apt install default-jdk`
  - macOS: `brew install openjdk`
  - Windows: Download JDK from java.com

### Error: "ClassNotFoundException"
- Verify all JAR files are present in `lib/` directory
- Check file names match exactly
- Ensure classpath includes `lib/*`

### Error: "UnsupportedFileFormatException"
- File might be corrupted
- File might not be a valid Access database
- Try opening the file in Microsoft Access to verify

### Error: "Permission denied"
- Ensure the database file is readable
- On Linux/macOS: `chmod +r database.accdb`

## 🏗️ Production Deployment

For production builds, ensure:

1. **Bundle JAR files** with your Electron app
2. **Package Java helper** in the resources folder
3. **electron-builder configuration** in package.json:

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

4. Consider bundling a **JRE with your app** for users who don't have Java installed:
   - Use [jpackage](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jpackage.html)
   - Or bundle OpenJDK manually

## 📚 Additional Resources

- [Jackcess Documentation](https://jackcess.sourceforge.io/)
- [Microsoft Access Database Engine](https://www.microsoft.com/en-us/download/details.aspx?id=54920)
- [JSON-Java GitHub](https://github.com/stleary/JSON-java)

## ⚖️ License

This helper uses open-source libraries with Apache 2.0 licenses.


┌─────────────────────────────────────────────────────────────┐
│                    ELECTRON APP (JavaScript)                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   App.tsx    │ ───▶ │  preload.ts  │ ───▶ │  main.ts  │ │
│  │  (Renderer)  │      │    (Bridge)  │      │  (Main)   │ │
│  └──────────────┘      └──────────────┘      └─────┬─────┘ │
│       User UI            IPC Channel              │         │
│                                                    │         │
└────────────────────────────────────────────────────┼─────────┘
                                                     │
                                                     ▼
                                    ┌────────────────────────────┐
                                    │ databaseReader.ts          │
                                    │ (Node.js Service)          │
                                    └──────────┬─────────────────┘
                                               │
                                               │ spawn subprocess
                                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    JAVA HELPER (Java)                         │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────┐                                     │
│  │ AccessDBReader.java │ ──▶ Compiled to AccessDBReader.class│
│  └─────────┬───────────┘                                     │
│            │                                                  │
│            ▼                                                  │
│  ┌──────────────────────────────────────────────┐           │
│  │          JAR Libraries (lib/)                 │           │
│  │  • jackcess-4.0.5.jar    (Read .accdb)       │           │
│  │  • json-20231013.jar     (Output JSON)       │           │
│  │  • commons-logging-1.2.jar (Logging)         │           │
│  │  • commons-lang3-3.12.0.jar (Utils)          │           │
│  └──────────────────────────────────────────────┘           │
│                          │                                    │
│                          ▼                                    │
│              Reads .accdb file                               │
│                          │                                    │
│                          ▼                                    │
│              Outputs JSON file                               │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
              Electron reads JSON ─────▶ Display in UI
