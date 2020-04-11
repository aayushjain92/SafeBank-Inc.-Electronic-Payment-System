import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginPageActions } from './../store/actions';
import { AuthActions } from './../store/actions';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private store: Store<fromAuth.State>) { }

  loadUsers(): void {
    const users$: Observable<Array<User>> = this.http.get<Array<User>>(API_URL + 'login');
    users$.subscribe(users => {
      this.loadStickiesIntoStore(users);
    });
  }

  private loadStickiesIntoStore(users: Array<User>): void {
    this.store.dispatch(LoginPageActions.login({users}));
    console.log(this.store);
  }

  logIn(user: User): void {
    this.store.dispatch(AuthActions.loginSuccess({user}));
  }
}

  

  