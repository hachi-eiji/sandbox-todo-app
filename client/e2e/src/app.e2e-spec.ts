import { AppPage } from './app.po';

describe('client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('ログインID,passwordが空で表示される', () => {
    page.navigateTo();
    const loginForm = page.getLoginForm();
    expect(loginForm.loginId.getText()).toEqual('');
    expect(loginForm.password.getText()).toEqual('');
  });
});
