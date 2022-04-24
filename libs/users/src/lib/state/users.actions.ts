import {createAction, props} from '@ngrx/store';
import {User} from "../models/user";
//action
export const buildUserSession = createAction('[Users] Build User Session');

//effect
export const buildUserSessionSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: User }>());
//effect
export const buildUserSessionFailed = createAction(
  '[Users] Build User Session Failed');
