import path from "node:path";
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config = {
  ...sharedConfig,
  port: 4723,
  specs: ["../test/specs/android/add-note-screen*.js"],
  capabilities: [
    {
      "appium:platformName": "Android",
      "appium:platformVersion": "16.0",
      "appium:deviceName": "Pixel 4",
      "appium:automationName": "UIAutomator2",
      "appium:app": path.join(process.cwd(), "app/android/ColorNote+Notepad.apk"),
      "appium:autoGrantPermissions": true,
    },
  ],
  services: ["appium"],
};
