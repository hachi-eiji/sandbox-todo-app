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
});
