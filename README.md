Playwright Automation Framework (TypeScript)
This repository contains an enterprise-level Playwright automation framework built using TypeScript, Page Object Model (POM), and modern best practices.
The framework is designed for scalability, maintainability, and real-world automation scenarios using an OpenCart demo application.
Tech Stack
- Playwright
- TypeScript
- Page Object Model (POM)
- Allure Reporting
- Git & GitHub
- Data-Driven Testing (JSON & CSV)
- Node.js
📂 Project Structure
Playwright_Interview_Framework
│
├── pages/ # Page Object Model classes
├── tests/ # Test scripts
├── testdata/ # JSON / CSV test data
├── utils/ # Utility classes (Data Providers, Random Data)
├── playwright.config.ts # Playwright configuration
├── test.config.ts # Environment config
└── README.md

Framework Design

This framework follows:
- Page Object Model design pattern
- Reusable action methods
- Centralized configuration
- Modular structure
- Clean separation of test logic & page logic

Each page contains:
- Locators
- Action methods
- Validation methods

Automated Modules

Registration Module
- Register with mandatory fields
- Register with all fields (including newsletter)
- Validate account creation

Login Module
- Valid login
- Invalid login
- Data-driven login testing

Cart Module
- Add product with default quantity
- Add product with multiple quantity
- Add multiple products
- Invalid quantity validation

Reporting
Playwright HTML Report

Allure Report
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report

How to Run Tests
Run All Tests
->npx playwright test

Run Specific Test File
-> npx playwright test tests/ShoppingCart.spec.ts --headed

Data-Driven Testing
Test data is maintained in:
- JSON
- CSV

Handled using a centralized `DataProviders` utility.

Branch Strategy
- `main` → Stable code
- `feature/*` → Module-based development

Key Highlights

✔ Modular & Scalable  
✔ Enterprise-ready structure  
✔ Clean code practices  
✔ Reusable components  
✔ Separate environment configuration  
✔ Reporting integration  

Author
Manish Kumar  
QA Automation Engineer  
Playwright | TypeScript | API | CI/CD  
