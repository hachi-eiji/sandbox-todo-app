import { browser, by, element } from 'protractor';

export class AppPage {
  get baseUrl() {
    return browser.baseUrl;
  }

  get taskPageUrl() {
    return `${this.baseUrl}tasks`;
  }

  get loginPageUrl() {
    return `${this.baseUrl}login`;
  }

  navigateTo() {
    return browser.get('/');
  }

  getLoginForm() {
    return {
      loginId: element(by.name('loginId')),
      password: element(by.name('password')),
      loginButton: element(by.css('button'))
    };
  }

  getErrorMessage() {
    return element(by.css('.message'));
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  get currentUrl() {
    return browser.getCurrentUrl();
  }
}
