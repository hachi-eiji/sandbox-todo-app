import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../shared/user/user';
import * as UserReducer from '../../shared/user/user.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<User>) {
    this.user$ = store.pipe(select(UserReducer.selectUser));
  }

  ngOnInit() {
  }

}
