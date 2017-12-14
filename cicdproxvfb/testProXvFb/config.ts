import { browser, Config } from 'protractor';

export let config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    // SELENIUM_PROMISE_MANAGER: true,

    capabilities: {
        browserName: 'chrome'
    },
    
    directConnect: true,
    ignoreUncaughtExceptions: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ["../../testProXvFb/src/typeScript/test/features/*.feature"],
    baseUrl: 'https://www.google.com/',

    onPrepare: () => {
        browser.ignoreSynchronization= true;
        browser.manage().timeouts().implicitlyWait(10000);
        // browser.manage().window().maximize();
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        format: ['pretty'],
        require: ['../../testProXvFb/src/typeScript/test/stepdefinitions/*.ts', '../../testProXvFb/src/resources/main/hooks.ts'],
        tags: '@ProtractorHomePage'
    }
};