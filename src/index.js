import { basename } from 'path';

class CustomSQLReporter {
  constructor(options) {
    this.testResults = []; // To store all the results
  }

  onTestEnd(test, result) {
    // Extracting the browser name from test.title
    const title = test.title;  // e.g., 'chromium example.spec.js has title'
    const file = basename(test.titlePath().slice(-2, -1)[0]); // Get the file name
    const { status, duration, startTime } = result;

    // Extract the browser name from the title string (first word)
    const projectId =  (test.titlePath().join(' ')).split(' ')[1] || 'unknown'; // Extract first part before space as browser name

    // Add each test result to the array
    this.testResults.push(`('${file || "unknown"}', '${title || "unknown"}', '${projectId}', '${status || "unknown"}', '${startTime || ""}', ${duration || 0})`);
  }

  onEnd() {
    // When all tests are done, construct the final SQL insert statement
    if (this.testResults.length > 0) {
      const sqlStatement = `INSERT INTO your_table_name (file, title, projectId, status, startTime, duration) VALUES\n` +
                           this.testResults.join(',\n') + ';';

      console.log(sqlStatement); // Log the final SQL insert statement
    }
  }
}

export default CustomSQLReporter;
