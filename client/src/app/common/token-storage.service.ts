import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {
  private TOKEN_KEY = 'token';

  constructor() {
    if ('sessionStorage' in window && window.sessionStorage !== null) {
    } else {
      console.warn('can not user session storage');
    }
  }

  get() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  save(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  remove() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
