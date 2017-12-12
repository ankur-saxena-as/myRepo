import { browser, element, by, protractor, $$, $ } from 'protractor';


export enum IdentificationType {
    Xpath,
    Css,
    Id,
    Js,
    Name,
    PartialLinkText,
    ClassName,
    TagName,
    XpathAll,
    CssAll
}


export class BasePage {


     ElementLocator(obj) {
        switch (obj.type) {
            case IdentificationType[IdentificationType.Xpath]:
                return element(by.xpath(obj.value));
            case IdentificationType[IdentificationType.Css]:
                return element(by.css(obj.value));
            case IdentificationType[IdentificationType.Id]:
                return element(by.id(obj.value));
            case IdentificationType[IdentificationType.Js]:
                return element(by.js(obj.value));
            case IdentificationType[IdentificationType.Name]:
                return element(by.name(obj.value));
            case IdentificationType[IdentificationType.PartialLinkText]:
                return element(by.partialLinkText(obj.value));
            case IdentificationType[IdentificationType.ClassName]:
                return element(by.className(obj.value));
            case IdentificationType[IdentificationType.TagName]:
                return element(by.tagName(obj.value));
        }
     }

     ElementArrayLocator(obj){
        switch (obj.type) {
            case IdentificationType[IdentificationType.XpathAll]:
                return element.all(by.xpath(obj.value));
            case IdentificationType[IdentificationType.CssAll]:
                return element.all(by.css(obj.value));
        }
            
     }
}