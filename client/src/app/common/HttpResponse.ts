import { Response } from '@angular/http';

export class HttpResponse {
  body: any;
  status: number;

  constructor(body: any, status = 200) {
    this.body = body;
    this.status = status;
  }
}
