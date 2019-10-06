import { $$, by } from 'protractor';
import { AppPage } from './app.po';

describe('task App', () => {
  let appPage: AppPage;
  let loginForm;

  beforeAll(() => {
    appPage = new AppPage();
    appPage.navigateTo();
    loginForm = appPage.getLoginForm();
    loginForm.loginId.sendKeys('test0@example.com');
    loginForm.password.sendKeys('test');
    loginForm.loginButton.click();
  });

  it('ID,PasswordがDBと符合する場合タスク一覧画面に遷移する', () => {
    expect(appPage.currentUrl).toBe(appPage.taskPageUrl);
  });

  it('タスク画面に一覧が表示される', () => {
    expect($$('.m-title').count()).toEqual(25);
  });

  it('削除のボタンを押す', () => {
    const deleteButton = $$('.m-delete').first().all(by.css('.button'));
    deleteButton.click();
  });
});
