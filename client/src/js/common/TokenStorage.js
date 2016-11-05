class TokenStorage {
  constructor() {
    if (('sessionStorage' in window) && (window.sessionStorage !== null)) {
    } else {
      console.warn('can not user session storage');
    }
  }

  get() {
    return sessionStorage.getItem(TokenStorage.TOKEN_KEY);
  }

  save(token) {
    sessionStorage.setItem(TokenStorage.TOKEN_KEY, token);
  }

  remove() {
    sessionStorage.removeItem(TokenStorage.TOKEN_KEY);
  }
}
TokenStorage.TOKEN_KEY = 'token';
export default new TokenStorage();
