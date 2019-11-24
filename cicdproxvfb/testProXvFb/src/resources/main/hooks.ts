///<reference path="../../../../node_modules/@types/cucumber/index.d.ts"/>
const Cucumber = require('cucumber');
import { browser, protractor } from "protractor/built";
import * as fs from 'fs';
import { defineSupportCode, Scenario } from "cucumber";
import * as reporter from 'cucumber-html-reporter';
import {config} from "../../../config";
import {GeneralComponent} from "../../../../CommonComponents/GeneralComponent";
import { mkdirp } from 'mkdirp';


defineSupportCode(function ({ registerHandler, registerListener, After, setDefaultTimeout}) {
    setDefaultTimeout(10 * 50000);

    let jsonReports = process.cwd() + "/reports/json";
    let htmlReports = process.cwd() + "/reports/html";
    let targetJson = jsonReports + "/cucumber_report.json";

    browser.manage().logs().get('browser')

    // let loginComponents: LoginComponents = new LoginComponents();
    let generalCompFuncs: GeneralComponent = new GeneralComponent();

    registerHandler('BeforeFeature', async function () {
        await generalCompFuncs.openBrowser(config.baseUrl);
        // await loginComponents.signIn("admin")
    });
    
    After(async function (scenarioResult) {
        let world = this;
        if (scenarioResult.isFailed()) {
            let screenShot = await browser.takeScreenshot();
            // screenShot is a base-64 encoded PNG
            world.attach(screenShot, 'image/png');
        }
       
    });


    // registerHandler('AfterFeature', async function () {
    //     await browser.driver.close();
    // });

    // After((scenario, done) => {
    //     if (scenario.isFailed()) {
    //         return browser.takeScreenshot().then(function (base64png) {
    //             let decodedImage = new Buffer(base64png, 'base64').toString('binary');
    //             scenario.attach(decodedImage, 'image/png');
    //         }, (err) => {
    //             done(err);
    //         });
    //     } else {
    //         done();
    //     }
    // });

    let cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: targetJson,
        output: htmlReports + "/cucumber_reporter.html",
        reportSuiteAsScenarios: true,
        launchReport: true
    };

    let logFn = string => {
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
        try {
            fs.writeFileSync(targetJson, string);
            reporter.generate(cucumberReporterOptions); // invoke cucumber-html-reporter

        } catch (err) {
            if (err) {
                console.log(`Failed to save cucumber test results to json file. 
                             Failed to create html report.
                             `);
                console.log(err);
            }
        }
    };
    let jsonformatter = new Cucumber.JsonFormatter({
        log: logFn
    });
    registerListener(jsonformatter);
})