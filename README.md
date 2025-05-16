# Senior Test Automation Engineer Technical Task – dormakaba

## Table Of Content
- [Test Automation Framework with Playwright](#test-automation-framework-with-playwright)
  - [Automated Scenario](#automated-scenario)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Running Tests](#running-tests)
- [Allure Reports](#-allure-reports)


## Test Automation Framework with Playwright

This repository contains a small Page Object Model (POM) based automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). 
It demonstrates end-to-end test automation for a predefined scenario on [Automation Exercise](https://www.automationexercise.com/).

### Automated Scenario

The following user journey is automated as part of this task:

1. Navigate to the home page: https://www.automationexercise.com/
2. Go to the **Products** section
3. Select the **Men > Jeans** category
4. Add a couple of **Jeans** items to the cart
5. Verify the contents of the cart.

### Tech Stack

- **Playwright** – Browser automation
- **TypeScript** – Strongly-typed language support
- **Node.js** – Runtime environment
- **POM (Page Object Model)** – Code structure for maintainability 
- **Allure Reports** – For advanced test reporting

### Project Structure

```text
.
├── pages/                   # Page Object files
│   ├── home.page.ts
│   ├── products.page.ts
│   └── cart.page.ts
├── tests/                   # Test specifications
│   └── products-in-cart.spec.ts
├── helpers/                   # Utility functions (optional)
     └── helpers.ts
├── playwright.config.ts     # Playwright test configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project metadata and scripts
```

### Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (v18 or higher): [https://nodejs.org/](https://nodejs.org/)
- NPM: [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- Allure Report: [https://allurereport.org/docs/install/](https://allurereport.org/docs/install/)

### Setup

1. Clone the repository to your local machine.

```bash
   git clone https://github.com/your-username/dormakaba-playwright-task.git
```
2. Navigate to the project directory in the terminal.
3. Install the required dependencies using the following command:

```bash
  npm install
```

4. Install Playwright browsers using the following command:

```bash
  npx playwright install
```

## Running Tests
To run all tests:

```bash
  npx playwright test
```

To run a specific test file:

```bash
  npx playwright test tests/products-in-cart.spec.ts
```

To view the test run UI:

```bash
  npx playwright test --ui
```

## 📊 Allure Reports

This project is already configured to generate [Allure](https://docs.qameta.io/allure/) reports.

### How to Use

1. Run the tests:

```bash
   npx playwright test
 ```

2. Generate the Allure report:

```bash
   npx allure generate ./allure-results --clean -o ./allure-report
```

3. Open the report in your default browser:
```bash
   npx allure open ./allure-report
```