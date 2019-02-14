import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when loginId is empty', () => {
    component.register();
    fixture.whenStable().then(() => {
      expect(component.message).toEqual('ログインIDを入力してください');
    });
  });

  it('should show error when loginId length over than 256', () => {
    const value = 'e'.repeat(256);
    component.registerForm.get('loginId').setValue(value);
    component.register();
    fixture.whenStable().then(() => {
      expect(component.message).toEqual(`ログインIDは255文字以内で入力してください(現在の長さ${value.length})`);
    });
  });
});
