import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('client App', () => {
  let page: AppPage;
  let loginForm;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    loginForm = page.getLoginForm();
  });

  it('ログインID,passwordが空で表示される', () => {
    expect(loginForm.loginId.getAttribute('value')).toEqual('');
    expect(loginForm.password.getAttribute('value')).toEqual('');
  });

  it('パスワードが未入力の場合必須エラーが表示される', () => {
    loginForm.loginId.sendKeys('some user');
    loginForm.loginButton.click();

    expect(page.getErrorMessage().getText()).toEqual('ログインIDもしくはパスワードを入力してください');
  });

  it('ログインIDが未入力の場合必須エラーが表示される', () => {
    loginForm.password.sendKeys('some user');
    loginForm.loginButton.click();

    expect(page.getErrorMessage().getText()).toEqual('ログインIDもしくはパスワードを入力してください');
  });

  it('ID,PasswordがDBと符合しない場合ログイン画面を表示する', () => {
    loginForm.loginId.sendKeys('test0@example.com');
    loginForm.password.sendKeys('mistake it');
    loginForm.loginButton.click();

    expect(page.currentUrl).toBe(`${browser.baseUrl}login`);
    expect(page.getErrorMessage().getText()).toEqual('ログインID・パスワードが間違っています');
  });

  it('ログイン無しでタスク画面に遷移したときにログイン画面に戻される', () => {
    browser.get(page.taskPageUrl);
    expect(page.currentUrl).toBe(page.loginPageUrl);
  });

  it('ID,PasswordがDBと符合する場合タスク一覧画面に遷移する', () => {
    loginForm.loginId.sendKeys('test0@example.com');
    loginForm.password.sendKeys('test');
    loginForm.loginButton.click();

    expect(page.currentUrl).toBe(page.taskPageUrl);
  });
});
