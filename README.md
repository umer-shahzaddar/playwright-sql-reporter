# Playwright SQL Reporter

A **custom Playwright reporter** that generates SQL `INSERT` statements for test results and saves them into a file.

## Features

- Generates SQL statements containing test results (`file`, `title`, `projectId`, `status`, `startTime`, `duration`).
- Supports customizable table names through options.
- Outputs the SQL to a file (`sql-reporter/sql-statement.sql`).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-sql-reporter.git
   cd playwright-sql-reporter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure you have Playwright installed:
   ```bash
   npm install @playwright/test
   ```

---

## Configuration

To integrate the SQL reporter with Playwright, modify your **`playwright.config.js`** file:

```javascript
const CustomSQLReporter = require('./index.js');

module.exports = {
  reporter: [
    ['./index.js', { tableName: 'test_results' }]
  ],
};
```

### Options

- `tableName` (optional): Customize the name of the table in the SQL output.  
  Default: `'default_table_name'`

---

## Usage

1. Run Playwright tests:
   ```bash
   npx playwright test
   ```

2. Upon test completion, the reporter will:

   - Generate SQL `INSERT` statements for all test results.
   - Save the SQL statements in the following file:
     ```
     sql-reporter/sql-statement.sql
     ```

3. Example SQL output:
   ```sql
   INSERT INTO test_results (file, title, projectId, status, startTime, duration)
   VALUES 
   ('example.spec.js', 'has title', 'chromium', 'passed', 'Mon Dec 16 2024 14:12:37 GMT+0100', 628),
   ('example.spec.js', 'get started link', 'chromium', 'passed', 'Mon Dec 16 2024 14:12:37 GMT+0100', 669);
   ```

---

## File Structure

```
playwright-sql-reporter/
│
├── index.js                # Custom SQL Reporter code
├── playwright.config.js    # Playwright configuration
├── package.json            # Project dependencies
└── sql-reporter/           # Output directory for SQL files
    └── sql-statement.sql   # Generated SQL statements
```

---

## Example SQL Statement

Here’s a sample of what the reporter generates:

```sql
INSERT INTO test_results (file, title, projectId, status, startTime, duration)
VALUES 
('example.spec.js', 'has title', 'chromium', 'passed', 'Mon Dec 16 2024 14:12:37 GMT+0100', 628),
('example.spec.js', 'get started link', 'chromium', 'passed', 'Mon Dec 16 2024 14:12:37 GMT+0100', 669);
```

---

## Customization

You can customize the table name dynamically by modifying the `reporter` configuration in your `playwright.config.js` file:

```javascript
reporter: [
  ['./index.js', { tableName: 'custom_table_name' }]
]
```

---

## Troubleshooting

- **Directory Not Found:**  
  If the `sql-reporter/` directory does not exist, the reporter will automatically create it.

- **`path` Module Error:**  
  Ensure that you have `path` and `fs` modules properly imported:
  ```javascript
  const path = require('path');
  const fs = require('fs');
  ```

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
