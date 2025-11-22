import { $, $$, expect, driver} from '@wdio/globals';

describe('iOS Find Element', () => {
    
    // 72. Find element by Accessibility Id
    it('find element by accessibility id', async () => {
        await $('~Alert Views').click();
        await $('~Simple').click();
        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    // 73. Find element by Tag Name
    it('find by tag name', async () => {
        // single element
        console.log(await $('XCUIElementTypeStaticText').getText());

        // multiple elements
        const textEls = await $$('XCUIElementTypeStaticText');
        
        // testing JavaScript commands
        console.log(textEls.length);
        
        for (const element of textEls) {
            console.log(await element.getText());
        }
    });

    // 74. Find element by xpath
    it('find element by xpath', async () => {
        // xpath - (//tagname[@attribute=value])
        
        // await $('//XCUIElementTypeStaticText[@name="Alert Views"]').click();
        // await $('//XCUIElementTypeStaticText[@label="Simple"]').click();

        await $('//*[@name="Alert Views"]').click();
        await $('//*[@label="Simple"]').click();

        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    // 75. Find element by class chain
    it('find element by class chain', async () => {
        // const alertText = '**/XCUIElementTypeStaticText[`label == "Alert Views"`]';
        const alertText = '**/XCUIElementTypeStaticText[`label CONTAINS "Alert"`]';
        
        await $(`-ios class chain:${alertText}`).click();
        await $('//*[@label="Simple"]').click();

        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    // 76. Find element by predicate strings
    it('find element by predicate strings', async () => {
        // const alertText = 'label == "Alert Views"';
        const alertText = 'value BEGINSWITH[c] "alert"';
        
        await $(`-ios predicate string:${alertText}`).click();
        await $('//*[@label="Simple"]').click();

        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    // 77. Exercise
    it.only('exercise', async () => {
        await $('~Search').click();
        await $('~Default').click();
        await $('//XCUIElementTypeSearchField').addValue("I love this course!");
        await expect($('//XCUIElementTypeSearchField')).toHaveAttr("value");
        await $('~Clear text').click();
        await expect($('//XCUIElementTypeSearchField')).not.toHaveAttribute("value");
    });

});
