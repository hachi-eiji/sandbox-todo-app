import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../../core/core.module';
import { userReducer } from '../../shared/user/user.reducer';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [CoreModule,
        StoreModule.forRoot({user: userReducer})
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
