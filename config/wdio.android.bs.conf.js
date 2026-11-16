import "dotenv/config";
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config = {
  ...sharedConfig,
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  specs: ["../test/specs/android/add-note-screen*.js"],
  capabilities: [
    {
      platformName: "Android",
      "appium:platformVersion": "11.0",
      "appium:deviceName": "Google Pixel 5",
      "appium:automationName": "UIAutomator2",
      "appium:app":
        process.env.BROWSERSTACK_APP_ID ||
        "bs://bc304bf265db5f235d3c35793cd84d6175b81013",
      "appium:autoGrantPermissions": true,
    },
  ],
  services: ["browserstack"],
};
