import { Injectable } from '@angular/core';
import { HttpClient } from './HttpClient';

@Injectable()
export class TokenService {

  constructor(private httpClient: HttpClient) {
  }

  get() {
    this.httpClient.getJson('/token')
      .subscribe();
  }
}
