import { AppPage } from './app.po';

describe('task App', () => {
  let appPage: AppPage;
  let loginForm;

  beforeEach(() => {
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
});
