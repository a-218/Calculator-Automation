import calculatorPage from "../page/calcualtorFunctions"

describe('Calculator functions', () => {
  beforeEach(() => {
    calculatorPage.visit();
  })

  it('can add 2+2', () => {

    calculatorPage.enterNumber(2);
    calculatorPage.add();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("4");
    })

  })

  it('can subtract number', () => {

    calculatorPage.enterNumber(2);
    calculatorPage.substract();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("0");
    })

  })

  it('can mutiply number', () => {
    calculatorPage.enterNumber(2);
    calculatorPage.multiply();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("4");
    })
  })

  it('can divide number', () => {
    calculatorPage.enterNumber(2);
    calculatorPage.divide();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("1");
    })
  })

  it('cannot divide zero', () => {
    calculatorPage.enterNumber(2);
    calculatorPage.divide();
    calculatorPage.enterNumber(0)
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("Invalid Expression");
    })
  })

  it('can record past calculation', () => {
    calculatorPage.enterNumber(2);
    calculatorPage.divide();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();
    calculatorPage.clear();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("0");
    })

    calculatorPage.enterNumber(22);
    calculatorPage.add();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();
    calculatorPage.clear();

    cy.get(".history-item").should('have.length', 2);
  })

  it('can do parenthesis and decimal  calculation', () => {
    calculatorPage.enterNumber(22.2);
    calculatorPage.divide();
    calculatorPage.openBracket();
    calculatorPage.enterNumber(2);
    calculatorPage.enterNumber(2);
    calculatorPage.divide();
    calculatorPage.enterNumber(2);
    calculatorPage.closeBracket();
    calculatorPage.equal();

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("2.01818182");
    })

  })

  it('can do calculation base on previous calculation', () => {
    calculatorPage.enterNumber(2);
    calculatorPage.divide();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    calculatorPage.add();
    calculatorPage.enterNumber(2)
    calculatorPage.equal();

    cy.get(".history-item").should('have.length', 2);

    calculatorPage.getResult().then((result) => {
      expect(result).to.equal("3");
    })
  })

})