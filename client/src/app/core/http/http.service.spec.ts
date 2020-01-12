import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = environment.api.url;

  interface TestResponse {
    id: number;
    name: string;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should respond test', inject([HttpService], (service: HttpService) => {
    const expected: TestResponse = {id: 1, name: 'test'};

    service.get<TestResponse>('/test')
      .subscribe(d => {
        expect(d).toEqual(expected);
      });

    const req = httpTestingController.expectOne(`${url}/test`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Accept')).toEqual('application/json');
    expect(req.request.withCredentials).toBeTruthy();

    req.flush(expected);
  }));

  it('should raise error when response 500 error', inject([HttpService], (service: HttpService) => {
    const statusText = 'Internal server error';
    const message = 'an error occurred';
    const status = 500;
    service.get('/test').subscribe(d => fail(d), (error: HttpErrorResponse) => {
      expect(error.ok).toBeFalsy();
      expect(error.error.message).toEqual(message);
      expect(error.error.status).toEqual(status);
    });
    const req = httpTestingController.expectOne(`${url}/test`);
    req.flush({
      message,
      status
    }, {
      status,
      statusText
    });
  }));

  it('should raise error when network error occurred', inject([HttpService], (service: HttpService) => {
    const message = 'network error occurred';

    service.get('/test').subscribe(d => fail(d), error => {
      expect(error.error.message).toEqual(message);
    });
    const req = httpTestingController.expectOne(`${url}/test`);
    const e = new ErrorEvent('Network Error', {message});
    req.error(e);
  }));

  it('should raise error when response 500 error at post', inject([HttpService], (service: HttpService) => {
    const statusText = 'Internal server error';
    const message = 'an error occurred';
    const status = 500;
    service.post('/test').subscribe(d => fail(d), (error: HttpErrorResponse) => {
      expect(error.ok).toBeFalsy();
      expect(error.error.message).toEqual(message);
      expect(error.error.status).toEqual(status);
    });
    const req = httpTestingController.expectOne(`${url}/test`);
    req.flush({
      message,
      status
    }, {
      status,
      statusText
    });
  }));

  it('should raise error when network error occurred at post', inject([HttpService], (service: HttpService) => {
    const message = 'network error occurred';

    service.post('/test').subscribe(d => fail(d), error => {
      expect(error.error.message).toEqual(message);
    });
    const req = httpTestingController.expectOne(`${url}/test`);
    const e = new ErrorEvent('Network Error', {message});
    req.error(e);
  }));

  describe('delete', () => {
    it('should call http client', inject([HttpService], (service: HttpService) => {
      service.delete<{ status: number }>('/test/1')
      .subscribe(d => {
        expect(d).toEqual({ status: 200 });
      });

      const req = httpTestingController.expectOne(`${url}/test/1`);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.headers.get('Accept')).toEqual('application/json');
      expect(req.request.withCredentials).toBeTruthy();

      req.flush({ status: 200 });
    }));
  });

  describe('put', () => {
    it('should call http client', inject([HttpService], (service: HttpService) => {
      const data = {
        message: 'test',
      };
      service.put('/test/1', data).subscribe((d) => {
        expect(d).toEqual({ status: 200 });
      });
      const req = httpTestingController.expectOne(`${url}/test/1`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.headers.get('Accept')).toEqual('application/json');
      expect(req.request.withCredentials).toBeTruthy();

      req.flush({ status: 200 });
    }));
  });
});
