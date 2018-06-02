import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenService} from './token.service';
import {TokenStorageService} from './token-storage.service';
import {HttpClientService} from './http-client.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TokenService,
        HttpClient,
        HttpClientService,
        TokenStorageService,
      ],
    });
  });

  it('should ...', async(inject([TokenService, HttpClient], (service: TokenService, httpClient: HttpClient) => {
    spyOn(httpClient, 'get').and.returnValue(Observable.create(observable => observable.next()));
    expect(service.get()).toBeUndefined();
  })));
});
