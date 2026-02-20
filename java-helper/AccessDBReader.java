import com.healthmarketscience.jackcess.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import org.json.*;

/**
 * Cross-platform Access Database Reader
 * Reads .accdb/.mdb files and outputs JSON
 * 
 * Requirements:
 * - Jackcess library (handles .accdb and .mdb)
 * - JSON library for output
 * 
 * Usage: java -cp ".:lib/*" AccessDBReader <path-to-accdb> <output-json-path>
 */
public class AccessDBReader {
    
    private static final String[] REQUIRED_TABLES = {
        "temp00DwgLabel",
        "temp01selfuncsys1",
        "temp02seldsts-left-inputs1",
        "temp03selsrcs-right-outputs1"
    };
    
    public static void main(String[] args) {
        if (args.length != 2) {
            System.err.println("Usage: java AccessDBReader <input.accdb> <output.json>");
            System.exit(1);
        }
        
        String inputPath = args[0];
        String outputPath = args[1];
        
        try {
            JSONObject result = readDatabase(inputPath);
            
            // Write to output file
            Files.write(
                Paths.get(outputPath),
                result.toString(2).getBytes(),
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING
            );
            
            System.out.println("SUCCESS: Database read successfully");
            System.exit(0);
            
        } catch (Exception e) {
            JSONObject error = new JSONObject();
            error.put("success", false);
            error.put("error", e.getMessage());
            error.put("type", e.getClass().getSimpleName());
            
            try {
                Files.write(
                    Paths.get(outputPath),
                    error.toString(2).getBytes(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
                );
            } catch (IOException ioe) {
                System.err.println("Failed to write error to file: " + ioe.getMessage());
            }
            
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
    
    private static JSONObject readDatabase(String dbPath) throws IOException {
        File dbFile = new File(dbPath);
        
        if (!dbFile.exists()) {
            throw new FileNotFoundException("Database file not found: " + dbPath);
        }
        
        JSONObject result = new JSONObject();
        result.put("success", true);
        result.put("filePath", dbPath);
        result.put("fileName", dbFile.getName());
        
        JSONObject tablesData = new JSONObject();
        List<String> missingTables = new ArrayList<>();
        List<String> foundTables = new ArrayList<>();
        
        try (Database db = DatabaseBuilder.open(dbFile)) {
            
            // Check which tables exist
            Set<String> availableTables = db.getTableNames();
            
            for (String requiredTable : REQUIRED_TABLES) {
                if (availableTables.contains(requiredTable)) {
                    foundTables.add(requiredTable);
                    
                    // Read table data
                    Table table = db.getTable(requiredTable);
                    JSONArray rows = new JSONArray();
                    
                    for (Row row : table) {
                        JSONObject rowData = new JSONObject();
                        for (Map.Entry<String, Object> entry : row.entrySet()) {
                            String key = entry.getKey();
                            Object value = entry.getValue();
                            
                            // Handle different data types
                            if (value == null) {
                                rowData.put(key, JSONObject.NULL);
                            } else if (value instanceof Date) {
                                rowData.put(key, value.toString());
                            } else if (value instanceof byte[]) {
                                rowData.put(key, "[BINARY DATA]");
                            } else {
                                rowData.put(key, value);
                            }
                        }
                        rows.put(rowData);
                    }
                    
                    JSONObject tableInfo = new JSONObject();
                    tableInfo.put("rowCount", rows.length());
                    tableInfo.put("columns", getColumnInfo(table));
                    tableInfo.put("data", rows);
                    
                    tablesData.put(requiredTable, tableInfo);
                    
                } else {
                    missingTables.add(requiredTable);
                }
            }
            
            result.put("tables", tablesData);
            result.put("foundTables", new JSONArray(foundTables));
            result.put("missingTables", new JSONArray(missingTables));
            
            if (!missingTables.isEmpty()) {
                result.put("warning", "Some required tables were not found in the database");
            }
            
        } catch (IOException e) {
            throw new IOException("Failed to read database: " + e.getMessage(), e);
        }
        
        return result;
    }
    
    private static JSONArray getColumnInfo(Table table) throws IOException {
        JSONArray columns = new JSONArray();
        
        for (Column column : table.getColumns()) {
            JSONObject colInfo = new JSONObject();
            colInfo.put("name", column.getName());
            colInfo.put("type", column.getType().toString());
            colInfo.put("length", column.getLength());
            columns.put(colInfo);
        }
        
        return columns;
    }
}
