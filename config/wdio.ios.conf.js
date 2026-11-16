import path from "node:path";
import { config as sharedConfig } from "./wdio.shared.conf.js";

export const config = {
  ...sharedConfig,
  port: 4723,
  specs: ["../test/specs/ios/webview.spec.js"],
  capabilities: [
    {
      "appium:platformName": "iOS",
      "appium:platformVersion": "17.2",
      "appium:deviceName": "iPhone 12",
      "appium:automationName": "XCUITest",
      "appium:app": path.join(process.cwd(), "app/ios/wdiodemoapp.app"),
    },
  ],
  services: [
    [
      "appium",
      {
        args: {
          address: "localhost",
          port: 4723,
          relaxedSecurity: true,
        },
        logPath: "./logs",
      },
    ],
  ],
};
