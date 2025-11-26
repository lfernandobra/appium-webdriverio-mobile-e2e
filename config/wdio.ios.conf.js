const path = require('path');
const { config } = require('./wdio.shared.conf');

config.port = 4723;

config.specs = [
    '../test/specs/ios/webview.spec.js'
];

config.capabilities = [
    {
        'appium:platformName': 'iOS',
        'appium:platformVersion': '17.2',
        'appium:deviceName': 'iPhone 12',
        'appium:automationName': 'XCUITest',
        'appium:app': path.join(process.cwd(), 'app/ios/wdiodemoapp.app'),
    }
];

 //
 // Test runner services
 // Services take over a specific job you don't want to take care of. They enhance
 // your test setup with almost no effort. Unlike plugins, they don't add new
 // commands. Instead, they hook themselves up into the test process.
config.services = [['appium', {
    args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true
    },
    logPath: './'
}]];

exports.config = config;
