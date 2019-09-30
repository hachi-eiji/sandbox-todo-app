import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginForm() {
    return {
      loginId: element(by.name('loginId')),
      password: element(by.name('password'))
    };
  }
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
