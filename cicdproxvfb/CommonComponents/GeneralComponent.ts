import {browser, protractor, ElementFinder, ExpectedConditions, ElementArrayFinder} from "protractor";
import { Scenario } from "cucumber";
import * as json from 'load-json-file';
import {error, until} from "selenium-webdriver";
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {puts} from "util";
let expect = chai.expect;
chai.use(chaiAsPromised);

export class GeneralComponent {

    // public deferred = protractor.promise.defer();//TODO: I have to comment this out and use deferred as local variable for all the methods, as the deferred was returning same value for all the resolved prmoise.

    /**
     * This method can be used for checking the element presence with explicit wait concept of selenium
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async waitForElementPresence(webElement: ElementFinder){

        let deferred = protractor.promise.defer();

        let EC = protractor.ExpectedConditions;

            await browser.wait(EC.presenceOf(webElement), 30000)
                .then(async(val)=>{
                    if(val){
                        // await this.scrollIntoView(webElement); NOTE: Do not to use scrollIntoView here
                        await GeneralComponent.log("element present ", this.waitForElementPresence);
                        await GeneralComponent.log(typeof val +" and the value is "+val+" ", this.waitForElementPresence);
                        await deferred.fulfill(true);
                    }
                    else{
                        // this.deferred.reject(error);
                        await GeneralComponent.log("Element not present" + error, this.waitForElementPresence);
                        await deferred.reject("Element not present");
                        // throw "Element Not Present";
                    };

                })
                .catch(async(error)=>{
                    await GeneralComponent.log("Element not present" + error, this.waitForElementPresence);
                    await deferred.reject(error);
                    throw error;
            });

        return await deferred.promise;
    }

    /**
     * Method to check if the webElement is clickable
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async waitForElementToBeClickable(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        let EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.elementToBeClickable(webElement), 50000)
        // await browser.wait(EC.elementToBeClickable(webElement), 10000)
            .then(async ()=>{
                await GeneralComponent.log("Element is clickable ", this.waitForElementToBeClickable);
                await deferred.fulfill(true);
            })
            .catch(async (reason)=>{
                await GeneralComponent.log("Element is not clickable", this.waitForElementToBeClickable);
                await deferred.reject(reason);
                // throw reason;
            })
        return await deferred.promise;
    }

    /**
     * This method will open the browser with the given url.
     * @author Ankur Saxena
     * @param {string} url : This parameter will take default value from the config file if the input is not provided
     * @returns {Promise<any>}
     */
    // async openBrowser(url: string = config.baseUrl){
    async openBrowser(url: string){
        let pageState, deferred = protractor.promise.defer();
        await GeneralComponent.log(url, this.openBrowser )
        await browser.get(url)
            .then(async ()=>{
                // browser.wait(()=>{this.getPageLoadState()}, 10000);
                pageState = this.getPageLoadState();
                await browser.wait(pageState, 10000);
                await deferred.fulfill(true);
            })
            .catch(async (error)=>{
                await deferred.reject(error);
                throw error;
            })
        return await deferred.promise;
    }

    /**
     * Method to get the browser laoding state and if it is complete returns true.
     * @author Ankur Saxena
     * @returns {Promise<boolean>}
     */
    async getPageLoadState() {
        let browserState: any, bFlag: boolean;
        let deferred = protractor.promise.defer();

        // await browser.driver.executeScript("return document.onload")
        // await browser.executeAsyncScript("apex:actionSupport event=onload")
        browser.executeScript("return document.readyState")
            .then(async (state)=>{
                await GeneralComponent.log("The laoding state of the page is "+state, this.getPageLoadState);
                if(state=='complete'){
                    // bFlag = true;
                    await deferred.fulfill(true);
                }else{
                    // bFlag = false;
                    await deferred.reject(false);
                }
            })
            .catch(async (error)=>{
                await GeneralComponent.log("The error is "+error, this.getPageLoadState);
                await deferred.reject(error);
                throw error;
                // return await false;
            })

        return await deferred.promise;
        // return bFlag;
        }


    /**
     * Method to send the text
     * @author Ankur Saxena
     * @param {ElementFinder} webelement
     * @param {string} text
     * @returns {Promise<any>}
     */
    async sendText(webelement: ElementFinder,text: string){
        let deferred = protractor.promise.defer();
        await this.waitForElementPresence(webelement)
            .then(async()=>{
                await GeneralComponent.log("The text is "+text, this.sendText);
                await webelement.clear();
                await webelement.sendKeys(text);
                await deferred.fulfill(true);
            })
            .catch(async(reason)=>{
                await GeneralComponent.log(reason, this.sendText);
                await deferred.reject(reason);
                throw reason;
            })
        return await deferred.promise;
    }

    /**
     * Method to click the button
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async clickButton(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        await this.waitForElementPresence(webElement)
            .then(async (val)=>{
                // await console.log(val+" "+ this.clickButton.name);
                await GeneralComponent.log("type of promise is "+typeof val +" and the value is "+val, this.clickButton );
                await this.waitForElementToBeClickable(webElement)
                    .then(async ()=>{
                        await GeneralComponent.log("The button is clickable", this.clickButton);
                        await webElement.click()
                            .then(async ()=>{
                                await GeneralComponent.log("Clicked on the button", this.clickButton);
                                await deferred.fulfill(true);
                            })
                    })
            })
            .catch(async (reason)=>{
                await GeneralComponent.log("The error is  "+reason, this.clickButton);
                await deferred.reject(reason);
                throw reason;
            });
        return await deferred.promise;
    }

    /**
     * Method to click the button using move mouse method
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async clickButtonUsingMoveMouse(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        await this.waitForElementPresence(webElement)
            .then(async (val)=>{
                // await console.log(val+" "+ this.clickButton.name);
                await GeneralComponent.log("type of promise is "+typeof val +" and the value is "+val, this.clickButton );
                await this.waitForElementToBeClickable(webElement)
                    .then(async ()=>{
                        await GeneralComponent.log("The button is clickable", this.clickButton);
                        await browser.actions().mouseMove(webElement).click().perform()
                            .then(async ()=>{
                                await GeneralComponent.log("Clicked on the button", this.clickButton);
                                await deferred.fulfill(true);
                            })
                    })
            })
            .catch(async (reason)=>{
                await GeneralComponent.log("The error is  "+reason, this.clickButton);
                await deferred.reject(reason);
                throw reason;
            });
        return await deferred.promise;
    }

    /**
     * Method to get the text of the given locator
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async getText(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        let strMsg: any = null;
        await this.waitForElementPresence(webElement)
            .then( async ()=>{
                await (webElement).getText()
                    .then(async (uiMsg)=>{
                        strMsg = uiMsg.toString();
                        if (strMsg!= null){
                            await GeneralComponent.log("The text is: "+strMsg, this.getText);
                            await deferred.fulfill(uiMsg);
                        }
                        else{
                            await GeneralComponent.log("The text is null", this.getText);
                            await deferred.reject();
                            throw "The text is null";
                        }
                    })
            })
            .catch(async(reason)=>{
                await GeneralComponent.log(reason, this.getText);
                await deferred.reject(reason);
                throw reason;
            });
        return await deferred.promise;
    }


    // async json("").then((adminUserDetails) =>{
	// 		let userName = (<any>adminUserDetails).userName;
    //         let password = (<any>adminUserDetails).password;
    //         let 
    // });

    /**
     * Method to load common test data JSON file.
     * TODO: This is just a sample implementation, has to be extended further to be implemented.
     * @author Ankur Saxena
     * @returns {Promise<void>}
     */
    async commonTestData(){
        
        json("../Alerts/src/resources/test/testData/commonData.json")
            .then((adminUserDetails) => {
                // let adminLoginDetails: any[][]= adminUserDetails;
                // return adminLoginDetails;
                let userName = (<any>adminUserDetails).userName;
                let password =(<any>adminUserDetails).password;
        });
    }

    /**
     * This method is to check uncheck the check box.
     * TODO: The application is not changing any property in DOM after checking or unchecking the checkbox.
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @param {boolean} check
     * @returns {Promise<any>}
     */
    async enableDisableCheckBox(webElement: ElementFinder, check: boolean){
        let deferred = protractor.promise.defer();
        if (check) {
            await this.waitForElementPresence(webElement)
                .then(async ()=>{
                    await webElement.click();
                    await deferred.fulfill(true);
                })
                .catch(async(reason)=>{
                    await GeneralComponent.log(reason, this.enableDisableCheckBox);
                    await deferred.reject(reason);
                    throw reason;
                })
        }
        return await deferred.promise;
    }

    /**
     * This method can be used to scroll the element in to view
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async scrollIntoView(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        await browser.executeScript('window.scrollTo(0, (arguments[0].getBoundingClientRect().top + window.pageYOffset)-(window.innerHeight / 2))', webElement.getWebElement())

            .then( async ()=>{
                // await browser.executeScript('arguments[0].scrollBy(0, 500)', webElement.getWebElement());
                await deferred.fulfill(true);
            })
            .catch(async (reason)=>{
                await deferred.reject(reason);
                throw reason;
            })
        return await deferred.promise;
    }

    /**
     * This method can be used to highlight the web element
     * @author Ankur Saxena
     * @param {ElementFinder} webElement
     * @returns {Promise<any>}
     */
    async highlightWebElement(webElement: ElementFinder){
        let deferred = protractor.promise.defer();
        await browser.executeScript("arguments[0].setAttribute('style', arguments[1]);",webElement, "color: Red; border: 2px solid red;")
            .then(async()=>{
                await deferred.fulfill(true);
            })
            .catch(async (reason)=>{
                await deferred.reject(reason);
                throw reason;
            })
        return await deferred.promise;
    }

    /**
     * TODO: Code to get the current instance of driver that is being used in feature file.
     *
     */
    async getBrowserDriver(){

    }

    /**
     * This method can be used to log the message to the console
     * @author Ankur Saxena
     * @param {string} message
     * @param {Function} Function
     */
    public static async log(message: string, Function?: Function){
        // TODO: Develop the function to get the name of the called method and print the name of method along with the error.
        if(Function!=null){
            // await console.log(Function.name+": "+message);
            await puts(Function.name+": "+message);
            
            }
        else{
            // await console.log(message);
            await puts(message);
        }
    }

    // public static async log(message:string){
    //     await console.log(message);
    // }


    /**
     * This method can be used to select dropdown by number
     * @author Sandip Poddar
     * @param {string} message
     * @param {Function} Function
     */

    async clickdropdown(webElementAll: ElementArrayFinder, text: string){
        let deferred = protractor.promise.defer();
        if (text) {
            //var options = await this.waitForElementPresence(webElement)
            await webElementAll
                .then(async(options)=>{
                    for(let eachOption of options){
                        await eachOption.getText()
                            .then(async(eachOptionText)=>{
                                if(eachOptionText.toString().toLowerCase() === text.toLowerCase()){
                                    await eachOption.click();
                                    await deferred.fulfill(true);
                                }
                            })
                    }
                })
                .catch(async(reason)=>{
                    await GeneralComponent.log(reason, this.clickdropdown);
                    await deferred.reject(reason);
                    throw reason;
                })
        }
        return await deferred.promise;
    }


}