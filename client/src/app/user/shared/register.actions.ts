import { Action } from '@ngrx/store';

export enum RegisterActionTypes {
  LoadRegisters = '[Register] Load Registers',
  
  
}

export class LoadRegisters implements Action {
  readonly type = RegisterActionTypes.LoadRegisters;
}


export type RegisterActions = LoadRegisters;
