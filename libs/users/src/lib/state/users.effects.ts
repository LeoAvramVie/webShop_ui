import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as UsersActions from './users.actions';

import {catchError, concatMap, map} from 'rxjs/operators'
import {LocalStorageService} from "../service/localStorage.service";
import {of} from "rxjs";
import {UsersService} from "../service/users.service";

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if (this.localStorageService.isValidToken()) {
        const userId = this.localStorageService.getUserIdFromToken();
        if (userId) {
          return this.usersService.getUserById(userId).pipe(
            map((user) => {
              return UsersActions.buildUserSessionSuccess({user: user})
            }),
            catchError(()=>of(UsersActions.buildUserSessionFailed()))
          )
        } else {
          return of(UsersActions.buildUserSessionFailed())
        }
      } else {
        return of(UsersActions.buildUserSessionFailed())
      }
    })
  ))

  constructor(private readonly actions$: Actions,
              private localStorageService: LocalStorageService,
              private usersService: UsersService) {
  }
}
