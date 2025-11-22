const path = require('path');
const { config } = require('./wdio.shared.conf');

config.port = 4723;

config.specs = [
    '../test/specs/ios/ios-native.spec.js'
];

config.capabilities = [
    {
        'appium:platformName': 'iOS',
        'appium:platformVersion': '17.2',
        'appium:deviceName': 'iPhone 12',
        'appium:automationName': 'XCUITest',
        'appium:app': path.join(process.cwd(), 'app/ios/UIKitCatalog.app'),
    }
];

exports.config = config;