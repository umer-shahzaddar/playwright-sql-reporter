import path from 'path';
import fs from 'fs'; // Import Node.js File System module

class CustomSQLReporter {
  constructor(options = {}) {
    this.testResults = []; // To store all the results
    this.tableName = options.tableName || 'your_table_name';
  }

  onTestEnd(test, result) {
    const title = test.title;
    const file = (test.titlePath().join(' ')).split(' ')[2] || 'unknown'; // Get the file name
    const { status, duration, startTime } = result;

    // Extract the browser name from the title string (first word)
    const projectId = (test.titlePath().join(' ')).split(' ')[1] || 'unknown'; // Extract first part before space as browser name

    // Format the start time to 'YYYY-MM-DD HH:mm:ss.SSS'
    const formattedStartTime = startTime ? new Date(startTime).toISOString().replace('T', ' ').split('.')[0] : ''; 

    // Add each test result to the array
    this.testResults.push(`('${file || "unknown"}', '${title || "unknown"}', '${projectId}', '${status || "unknown"}', '${formattedStartTime || ""}', ${duration || 0})`);
  }

  onEnd() {
    // When all tests are done, construct the final SQL insert statement
    if (this.testResults.length > 0) {
      const sqlStatement = `INSERT INTO ${this.tableName} (file, title, projectId, status, startTime, duration) VALUES\n` +
        this.testResults.join(',\n') + ';';

      // Define the target file path
      const dirPath = path.join(path.resolve(), './sql-report'); // Relative path for directory
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
