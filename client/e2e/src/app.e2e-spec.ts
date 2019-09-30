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
});
