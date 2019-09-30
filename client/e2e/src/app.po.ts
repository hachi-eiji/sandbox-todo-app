import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLoginForm() {
    return {
      loginId: element(by.name('loginId')),
      password: element(by.name('password')),
      form: element(by.binding('loginForm'))
    };
  }
  getErrorMessage(){
    return element(by.css('login-message'));
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
