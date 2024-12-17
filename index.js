import { basename } from 'path';
import path from 'path';
import fs from 'fs'; // Import Node.js File System module

class CustomSQLReporter {
  constructor(options = {}) {
    this.testResults = []; // To store all the results
    this.tableName = options.tableName || 'your_table_name';
  }

  onTestEnd(test, result) {
    // Extracting the browser name from test.title
    const title = test.title;  // e.g., 'chromium example.spec.js has title'
    const file = basename(test.titlePath().slice(-2, -1)[0]); // Get the file name
    const { status, duration, startTime } = result;

    // Extract the browser name from the title string (first word)
    const projectId = (test.titlePath().join(' ')).split(' ')[1] || 'unknown'; // Extract first part before space as browser name

    // Add each test result to the array
    this.testResults.push(`('${file || "unknown"}', '${title || "unknown"}', '${projectId}', '${status || "unknown"}', '${startTime || ""}', ${duration || 0})`);
  }

  onEnd() {
    // When all tests are done, construct the final SQL insert statement
    if (this.testResults.length > 0) {
      const sqlStatement = `INSERT INTO ${this.tableName} (file, title, projectId, status, startTime, duration) VALUES\n` +
        this.testResults.join(',\n') + ';';

      // Define the target file path
      const dirPath = path.join(__dirname, './sql-report'); // Relative path for directory
      const filePath = path.join(dirPath, 'sql-statement.sql'); // Path for the SQL file

      // Ensure the directory exists
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }); // Create directory if it does not exist
      }

      // Write the SQL statement to the file
      fs.writeFileSync(filePath, sqlStatement, 'utf8');

      console.log(`SQL statement has been saved to ${filePath}`);
    }
  }
}

export default CustomSQLReporter;
