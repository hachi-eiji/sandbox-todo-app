import { async, inject, TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { HttpClient } from './HttpClient';
import { TokenStorage } from './TokenStorage';
import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TokenService,
        HttpClient,
        Http,
        ConnectionBackend,
        TokenStorage,
      ],
    });
  });

  it('should ...', async(inject([TokenService, HttpClient], (service: TokenService, httpClient: HttpClient) => {
    spyOn(httpClient, 'getJson').and.returnValue(Observable.create(observable => observable.next()));
    expect(service.get()).toBeUndefined();
  })));
});
