import { Response } from "@angular/http";

export class HttpResponseError extends Error {
  status: number;
  body: any;
  res: Response;

  constructor(body: any, res: Response, status: number) {
    super(body.message);
    this.status = status;
    this.body = body;
    this.res = res;
  }
}
