import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RegisterEffects } from './register.effects';

describe('RegisterEffects', () => {
  let actions$: Observable<any>;
  let effects: RegisterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RegisterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
