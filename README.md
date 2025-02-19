# Playwright SQL Reporter

A **custom Playwright reporter** that generates SQL `INSERT` statements for test results and saves them into a file.

## Features

- Generates SQL statements containing test results (`file`, `title`, `projectId`, `status`, `startTime`, `duration`).
- Supports customizable table names through options.
- Outputs the SQL to a file (`sql-report/sql-statement.sql`).

---

## Installation

Install from npm:

    npm install playwright-sql-reporter

---

## Usage

To integrate the SQL reporter with Playwright, modify your **`playwright.config.js`** file:

```javascript
module.exports = {
  reporter: [
    ['playwright-sql-reporter', { tableName: 'test_results' }]
  ],
};
```

### Options

- `tableName` (optional): Customize the name of the table in the SQL output.  
  Default: `'your_table_name'`

---

## Example SQL Statement

Here’s a sample of what the reporter generates:

```sql
INSERT INTO test_results (file, title, projectId, status, startTime, duration)
VALUES 
('example.spec.js', 'has title', 'chromium', 'passed', '2025-02-11 15:49:18', 995),
('example.spec.js', 'get started link', 'chromium', 'passed', '2025-02-11 15:49:18', 1145);
```

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
