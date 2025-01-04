class CalculatorPagePlaywright {

    constructor(page){
        this.page = page;
        this.actionLocator =(action)=> 
            this.page.locator(`[data-action="${action}"]`); 

        this.operationLocator = (operation) => 
            this.page.locator(`[data-char="${operation}"]`); 

        this.digitLocator = (digit) => 
            this.page.locator(`[data-char="${digit}"]`); 

        this.resultLocator = this.page.locator('.result');  
    }   

    async visit(){
        await this.page.goto('http://localhost:8080');
    }   

    async enterNumber(num) {
        const digits = String(num).split('');
        for (const digit of digits) {
            await this.digitLocator(digit).click();
        }
    }

    async add(){
        await this.operationLocator("+").click();
    }

    async subtract() {
        await this.operationLocator('-').click();
    }
    
    async divide() {
        await this.operationLocator('/').click();
    }
    
    async multiply() {
        await this.operationLocator('*').click();
    }
    
    async decimal() {
        await this.digitLocator('.').click();
    }
    async clear() {
        await this.actionLocator('clear').click();
      }
    
    async openBracket() {
        await this.digitLocator('(').click();
    }

    async closeBracket() {
        await this.digitLocator(')').click();
    }

    async equal() {
        await this.actionLocator('calculate').click();
    }

    async backspace() {
        await this.actionLocator('backspace').click();
    }

    async getResult() {
     return await this.resultLocator.textContent();
    }
}

module.exports = CalculatorPagePlaywright;

