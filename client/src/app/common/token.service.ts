import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable()
export class TokenService {

  constructor(private httpClient: HttpClientService) {
  }

  get() {
    this.httpClient.get('/token')
      .subscribe();
  }
}
