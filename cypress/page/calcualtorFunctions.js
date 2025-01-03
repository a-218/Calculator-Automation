class calculatorPage {

  visit() {
    cy.visit('http://localhost:8080/')
  }

  enterNumber(num) {
    const digits = String(num).split('');
    digits.forEach(digit => {
      cy.get(`[data-char="${digit}"]`).click();
    })
  }

  add() {
    cy.get(`[data-char="+"]`).click();
  }

  substract() {
    cy.get(`[data-char="-"]`).click();
  }

  divide() {
    cy.get(`[data-char="/"]`).click();
  }

  multiply() {
    cy.get(`[data-char="*"]`).click();
  }

  decimal() {
    cy.get(`[data-char="."]`).click();
  }

  clear() {
    cy.get(`[data-action="clear"]`).click();
  }

  openBracket() {
    cy.get(`[data-char="("]`).click();
  }

  closeBracket() {
    cy.get(`[data-char=")"]`).click();
  }

  equal() {
    cy.get(`[data-action="calculate"]`).click();
  }

  backspace() {
    cy.get(`[data-action="backspace"]`).click();
  }

  getResult() {
    return cy.get(".result").invoke('text');
  }

}


module.exports = new calculatorPage();