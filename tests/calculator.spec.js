import { test, expect } from '@playwright/test';
import CalculatorPagePlaywright from '../pages/calculator';

test.describe('Calculator functions', () => {
    let calculatorPage;

    test.beforeEach(async ({ page }) => {
        calculatorPage = new CalculatorPagePlaywright(page);
        await calculatorPage.visit();
    });

  test('can add 2+2', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.add();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('4');
  });

  test('can subtract number', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.subtract();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('0');
  });

  test('can multiply number', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.multiply();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('4');
  });

  test('can divide number', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.divide();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('1');
  });

  test('cannot divide by zero', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.divide();
    await calculatorPage.enterNumber(0);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('Invalid Expression');
  });

  test('can record past calculation', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.divide();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();


    const result = await calculatorPage.getResult();
    expect(result).toBe('1');
    
    await calculatorPage.clear();
    await calculatorPage.enterNumber(22);
    await calculatorPage.add();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();
    await calculatorPage.clear();

    const historyItems = await page.locator(".history-item");
    expect(await historyItems.count()).toBe(2);
  });

  test('can do parenthesis and decimal calculation', async () => {
    await calculatorPage.enterNumber(22.2);
    await calculatorPage.divide();
    await calculatorPage.openBracket();
    await calculatorPage.enterNumber(2);
    await calculatorPage.enterNumber(2);
    await calculatorPage.divide();
    await calculatorPage.enterNumber(2);
    await calculatorPage.closeBracket();
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('2.01818182');
  });

  test('can do calculation based on previous calculation', async () => {
    await calculatorPage.enterNumber(2);
    await calculatorPage.divide();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('1');

    await calculatorPage.add();
    await calculatorPage.enterNumber(2);
    await calculatorPage.equal();

    result = await calculatorPage.getResult();
    expect(result).toBe('3');

    const historyItems = await page.locator(".history-item");
    expect(await historyItems.count()).toBe(2);

  });

  test('can detect invalid expression', async () => {
    await calculatorPage.closeBracket();
    await calculatorPage.openBracket();
    await calculatorPage.equal();

    const result = await calculatorPage.getResult();
    expect(result).toBe('Invalid Expression');
  });

});
