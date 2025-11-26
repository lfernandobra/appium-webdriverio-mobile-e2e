describe('iOS Webview', () => {
    it('Working with dynamic webview', async () => {
        await $('~Webview').click();

        // wait until you get multiple context
        await driver.waitUntil(async () => {
            const contexts = await driver.getContexts();
            return contexts.length > 1;
        }, { timeout: 30000, timeoutMsg: 'Timed out waiting for another context' });


        // // get current context
        // await driver.getContext();

        // // pause
        // await driver.pause(5000);

        // // get all the contexts
        // await driver.getContexts();

        // // pause
        // await driver.pause(5000);

        // // pause
        // await driver.pause(5000);

        // // get all the contexts
        // await driver.getContexts();

        // // pause
        // await driver.pause(5000);

        // get all the contexts
        const contexts = await driver.getContexts();

        // switch to the webview context

        await driver.switchContext(contexts[1]);

        // assertion
        const subtitleTxt = await $('.hero__subtitle');
        await expect(subtitleTxt).toHaveText(expect.stringContaining('automation'))
    });
});