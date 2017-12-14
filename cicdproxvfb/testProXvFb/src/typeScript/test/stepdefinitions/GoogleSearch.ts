import { defineSupportCode, TableDefinition } from 'cucumber';
import {browser, ElementFinder, protractor, element,by, By, ElementArrayFinder} from 'protractor';
import {GeneralComponent} from "../../../../../CommonComponents/GeneralComponent";
import {GoogleObjects} from "../../../../../testProXvFb/src/typeScript/main/objectRepository/GoogleObjects";
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import chaiString = require("chai-string");
let expect = chai.expect;
chai.use(chaiString);
chai.use(chaiAsPromised);

defineSupportCode(async ({Given, When, Then})=>{

    let generalComponentFunc: GeneralComponent = new GeneralComponent();
    let googleObjects: GoogleObjects = new GoogleObjects();

    
    let ssoidAtUserTab: string = null;
    let systemBillingStartDate: string = null;
    let newSystemBillingStartData: string = null;

    Given(`User navigates to the Google page`, async()=>{
        await expect(generalComponentFunc.waitForElementToBeClickable(googleObjects.GoogleSearchField)).to.be.eventually.fulfilled;
        await expect(googleObjects.GoogleSearchField.isPresent()).to.be.eventually.true;
    });

    When(`User types protractor in the search field`, async()=>{
        await expect(generalComponentFunc.sendText(googleObjects.GoogleSearchField, "protractor")).to.be.eventually.fulfilled;
    });

    When(`clicks on the search button`, async()=>{
        await expect(generalComponentFunc.clickButtonUsingMoveMouse(googleObjects.GoogleSearchButton)).to.be.eventually.fulfilled;
    });

    When(`clicks on the www.protractortest.org link`, async()=>{
        await expect(generalComponentFunc.waitForElementToBeClickable(googleObjects.ProtractorHomePageLink)).to.be.eventually.true;
        await expect(googleObjects.ProtractorHomePageLink.isPresent()).to.be.eventually.true;
        await expect(generalComponentFunc.clickButtonUsingMoveMouse(googleObjects.ProtractorHomePageLink)).to.be.eventually.true;
    });

    Then(`the user should be navigated to the protractor home page`, async()=>{
        await expect(generalComponentFunc.waitForElementToBeClickable(googleObjects.ProtractorHomePageLogo)).to.be.eventually.true;
        await expect(googleObjects.ProtractorHomePageLogo.isDisplayed()).to.be.eventually.false;
    });



});