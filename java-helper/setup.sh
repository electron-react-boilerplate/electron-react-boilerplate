#!/bin/bash

# Automated setup script for Java Helper
# This script will download required JAR files and compile the Java helper

set -e  # Exit on error

echo "🚀 Setting up Java Helper for Access Database Reading"
echo "========================================================"

# Check if Java is installed
echo ""
echo "1️⃣  Checking Java installation..."
if ! command -v java &> /dev/null; then
    echo "❌ ERROR: Java is not installed!"
    echo ""
    echo "Please install Java first:"
    echo "  Ubuntu/Debian: sudo apt install default-jre default-jdk"
    echo "  macOS:         brew install openjdk"
    echo "  Fedora/RHEL:   sudo dnf install java-latest-openjdk"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1)
echo "✅ Java found: $JAVA_VERSION"

# Check if javac (compiler) is installed
echo ""
echo "2️⃣  Checking Java compiler..."
if ! command -v javac &> /dev/null; then
    echo "❌ ERROR: Java compiler (javac) is not installed!"
    echo ""
    echo "Please install JDK:"
    echo "  Ubuntu/Debian: sudo apt install default-jdk"
    echo "  macOS:         brew install openjdk"
    echo "  Fedora/RHEL:   sudo dnf install java-latest-openjdk-devel"
    exit 1
fi

JAVAC_VERSION=$(javac -version 2>&1)
echo "✅ Java compiler found: $JAVAC_VERSION"

# Create lib directory
echo ""
echo "3️⃣  Creating lib directory..."
mkdir -p lib
echo "✅ lib/ directory created"

# Download JAR files
echo ""
echo "4️⃣  Downloading required JAR files..."

# Function to download if file doesn't exist
download_if_missing() {
    local filename=$1
    local url=$2
    
    if [ -f "lib/$filename" ]; then
        echo "   ⏭️  $filename already exists, skipping..."
    else
        echo "   📥 Downloading $filename..."
        wget -q --show-progress -O "lib/$filename" "$url"
        echo "   ✅ $filename downloaded"
    fi
}

# Jackcess
download_if_missing \
    "jackcess-4.0.5.jar" \
    "https://repo1.maven.org/maven2/com/healthmarketscience/jackcess/jackcess/4.0.5/jackcess-4.0.5.jar"

# JSON-Java
download_if_missing \
    "json-20231013.jar" \
    "https://repo1.maven.org/maven2/org/json/json/20231013/json-20231013.jar"

# Commons Logging
download_if_missing \
    "commons-logging-1.2.jar" \
    "https://repo1.maven.org/maven2/commons-logging/commons-logging/1.2/commons-logging-1.2.jar"

# Commons Lang
download_if_missing \
    "commons-lang3-3.12.0.jar" \
    "https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.12.0/commons-lang3-3.12.0.jar"

echo "✅ All JAR files downloaded"

# Compile Java helper
echo ""
echo "5️⃣  Compiling Java helper..."
javac -cp "lib/*" AccessDBReader.java
echo "✅ Java helper compiled successfully"

# Verify compilation
echo ""
echo "6️⃣  Verifying compilation..."
if [ -f "AccessDBReader.class" ]; then
    echo "✅ AccessDBReader.class created successfully"
else
    echo "❌ ERROR: Compilation failed - AccessDBReader.class not found"
    exit 1
fi

# Summary
echo ""
echo "========================================================"
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Summary:"
echo "   - Java version: $JAVA_VERSION"
echo "   - Compiler: $JAVAC_VERSION"
echo "   - JAR files: 4 libraries downloaded"
echo "   - Compilation: Success"
echo ""
echo "🎯 Next steps:"
echo "   1. Run your Electron app"
echo "   2. Click 'Upload Database File'"
echo "   3. Select an .accdb or .mdb file"
echo ""
echo "🧪 To test manually:"
echo "   java -cp \".:lib/*\" AccessDBReader /path/to/database.accdb output.json"
echo ""
echo "========================================================"
