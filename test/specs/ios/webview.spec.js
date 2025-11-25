describe('iOS Webview', () => {
    it('Working with dynamic webview', async () => {
        await $('~Webview').click();

        // get current context
        await driver.getContext();

        // pause
        await driver.pause(5000);

        // get all the contexts
        await driver.getContexts();

        // pause
        await driver.pause(5000);

        // get all the contexts
        await driver.getContexts();

        // switch to the webview context

        // assertion

    });
});