import { IHttpDataModel } from "../common/IHttpDataModel";

export class Login implements IHttpDataModel {
  constructor(public loginId:string,
              public password:string) {
  }

  public toJSONString(): string {
    return JSON.stringify({loginId: this.loginId, password: this.password});
  }
}
