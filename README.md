# GitHub Automation Testing 


### Overview

This testing project features a calculator implemented in index.html. Cypress is used for testing the calculator, and GitHub Actions is configured to automate the testing process on a http-server. 

## The Calculator

The `index.html` file contains a calculator implementation with these features:

- Basic arithmetic operations (+, -, ×, ÷)
- Parentheses support
- Decimal numbers
- Calculation history
- Error handling


## Testing and CI/CD

Cypress: Tests basic calculations, complex expressions, and error scenarios.

GitHub Actions: Automates dependency installation, test execution, and reporting.

Continuous Integration: Runs tests on every push and pull request to ensure reliability.


### 2.Local setup

Install http server globally

```console
npm install -g http-server
```
Install Cypress 
```console
npx cypress install
```

Open one terminal to run the following command to create the index.html in a local host 8080
if local host 8080 is occupied, update in the cypress test calculatorFunctions.js

```console
npx http-server [path-to-projectfolder]
```

Open the second terminal to run anc select the index.cy.js file to run tests

```console
npx cypress open
```



