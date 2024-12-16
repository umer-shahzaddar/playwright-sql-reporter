import { basename } from 'path';  // Use the path module to clean up the file path

class CustomSQLReporter {
  constructor(options) {
    this.testResults = []; // To store all the results
  }

  onTestEnd(test, result) {
    // Extracting the file name from the test's title path
    const file = basename(test.titlePath().slice(-2, -1)[0]); // Get the file name from the last part of the path
    const title = test.title;
    const { status, duration, startTime } = result;

    // Add each test result to the array
    this.testResults.push(`('${file || "unknown"}', '${title || "unknown"}', 'chromium', '${status || "unknown"}', '${startTime || ""}', ${duration || 0})`);
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
