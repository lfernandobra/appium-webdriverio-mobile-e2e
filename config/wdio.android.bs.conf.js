require('dotenv').config()

import { config } from './wdio.shared.conf';

//
// =====================
// Browserstack Credentials
// =====================
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;

config.specs = [
    '../test/specs/android/add-note-screen*.js'
];

config.capabilities = [
    {
        platformName: 'Android',
        'appium:platformVersion': '11.0',
        'appium:deviceName': 'Google Pixel 5',
        'appium:automationName': 'UIAutomator2',
        'appium:app': "bs://bc304bf265db5f235d3c35793cd84d6175b81013",
        'appium:autoGrantPermissions': true
    }
];

 //
 // Test runner services
 // Services take over a specific job you don't want to take care of. They enhance
 // your test setup with almost no effort. Unlike plugins, they don't add new
 // commands. Instead, they hook themselves up into the test process.
 config.services = ['browserstack'],

exports.config = config;