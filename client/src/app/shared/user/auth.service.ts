import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { LoginResult } from '../../login/shared/login-result.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpService: HttpService) {
  }

  login(loginId: string, password: string): Observable<LoginResult> {
    return this.httpService.post<LoginResult>('/login', { loginId, password });
  }
}
