
class Calculator {
  constructor() {
    this.currentExpression = "";
    this.history = [];
    this.maxHistoryItems = 10;
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.expressionElement = document.getElementById("expression");
    this.resultElement = document.getElementById("result");
    this.historyElement = document.getElementById("history");
  }

  setupEventListeners() {
    // Button clicks
    document.querySelector(".keypad").addEventListener("click", (e) => {
      const button = e.target.closest(".button");
      if (!button) return;

      const action = button.dataset.action;
      const char = button.dataset.char;

      if (action) {
        this[action]();
      } else if (char) {
        this.addChar(char);
      }
    });

    // Keyboard input
    document.addEventListener("keydown", (e) => {
      this.handleKeyPress(e);
    });

    // History clicks
    this.historyElement.addEventListener("click", (e) => {
      const historyItem = e.target.closest(".history-item");
      if (historyItem) {
        const expression = historyItem.dataset.expression;
        if (expression) {
          this.currentExpression = expression;
          this.updateDisplay();
        }
      }
    });
  }

  handleKeyPress(event) {
    const key = event.key;
    const validChars = /^[0-9+\-*/.()=]$/;

    if (validChars.test(key)) {
      event.preventDefault();
      this.addChar(key === "*" ? "×" : key === "/" ? "÷" : key);
    } else if (key === "Enter") {
      event.preventDefault();
      this.calculate();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.backspace();
    } else if (key === "Escape") {
      event.preventDefault();
      this.clear();
    }
  }

  addChar(char) {
    if (this.isValidInput(char)) {
      this.currentExpression += char;
      this.updateDisplay();
    }
  }

  isValidInput(char) {
    const lastChar = this.currentExpression.slice(-1);
    const operators = /[+\-×÷*/]/;

    // Prevent multiple operators in a row
    if (operators.test(char) && operators.test(lastChar)) {
      return false;
    }

    // Prevent multiple decimal points in a number
    if (char === "." && this.getLastNumber().includes(".")) {
      return false;
    }

    return true;
  }

  getLastNumber() {
    const numbers = this.currentExpression.split(/[+\-×÷*/()]/);
    return numbers[numbers.length - 1];
  }

  clear() {
    this.currentExpression = "";
    this.updateDisplay();
    this.showResult("0");
  }

  backspace() {
    this.currentExpression = this.currentExpression.slice(0, -1);
    this.updateDisplay();
  }

  calculate() {
    try {
      const expressionToEvaluate = this.currentExpression.replace(/×/g, "*").replace(/÷/g, "/");

      if (!expressionToEvaluate.trim()) {
        this.showResult("0");
        return;
      }

      const result = Function('"use strict";return (' + expressionToEvaluate + ")")();
      const formattedResult = this.formatResult(result);

      this.showResult(formattedResult);
      this.addToHistory(this.currentExpression, formattedResult);
      this.currentExpression = formattedResult;
      this.updateDisplay();
    } catch (error) {
      this.showError("Invalid Expression");
    }
  }

  formatResult(result) {
    if (!isFinite(result)) throw new Error("Invalid result");

    if (Number.isInteger(result)) {
      return result.toString();
    }

    // Handle floating point precision
    const fixed = result.toFixed(8);
    return parseFloat(fixed).toString();
  }

  showResult(result) {
    this.resultElement.textContent = result;
    this.resultElement.classList.remove("error");
  }

  showError(message) {
    this.resultElement.textContent = message;
    this.resultElement.classList.add("error");
  }

  updateDisplay() {
    this.expressionElement.textContent = this.currentExpression;
  }

  addToHistory(expression, result) {
    this.history.unshift({ expression, result });
    if (this.history.length > this.maxHistoryItems) {
      this.history.pop();
    }
    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    this.historyElement.innerHTML = this.history
      .map(
        (item) => `
                  <div class="history-item" data-expression="${item.expression}">
                      ${item.expression} = ${item.result}
                  </div>
              `
      )
      .join("");
  }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
  });
