const path = require('path');
const { config } = require('./wdio.shared.conf');

config.port = 4723;

config.specs = [
    '../test/specs/android/add-note-screen*.js'
];

config.capabilities = [
    {
        'appium:platformName': 'Android',
        'appium:platformVersion': '16.0',
        'appium:deviceName': 'Pixel 4',
        'appium:automationName': 'UIAutomator2',
        'appium:app': path.join(process.cwd(), 'app/android/ApiDemos-debug.apk'),
    }
];

exports.config = config;