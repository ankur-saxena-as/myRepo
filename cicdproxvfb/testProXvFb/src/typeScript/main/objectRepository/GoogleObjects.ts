import { BasePage, IdentificationType } from "../../../../../CommonComponents/BasePage";


const Locators = {

    GoogleSearchField:{
        type: IdentificationType[IdentificationType.Xpath],
        value: ".//*[@title='Search']"
    },

    GoogleSearchButton:{
        type: IdentificationType[IdentificationType.Xpath],
        value: ".//*[@name='btnK']"
    },

    ProtractorHomePageLink:{
        type: IdentificationType[IdentificationType.Xpath],
        value: "(.//*[text()='Protractor - end-to-end testing for AngularJS'])[1]"
    },

    ProtractorHomePageLogo:{
        type: IdentificationType[IdentificationType.Css],
        value: ".protractor-logo"
    }


};

export class GoogleObjects extends BasePage {

    GoogleSearchField = this.ElementLocator(Locators.GoogleSearchField);
    GoogleSearchButton = this.ElementLocator(Locators.GoogleSearchButton);
    ProtractorHomePageLink = this.ElementLocator(Locators.ProtractorHomePageLink);
    ProtractorHomePageLogo = this.ElementLocator(Locators.ProtractorHomePageLogo);

}