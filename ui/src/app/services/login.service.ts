import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginPageActions, AuthActions, LogoutActions } from './../store/actions';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[];

  constructor(private http: HttpClient, private store: Store<fromAuth.State>) { }

  getAllUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_URL + 'login');
  }

  setUsersToArray(): void {
    this.getAllUser().subscribe((users:User[]) => {
      this.users = users;
    })
  }

  loadUsers(): void {
    this.setUsersToArray();
    this.loadStickiesIntoStore(this.users);
  }

  private loadStickiesIntoStore(users: Array<User>): void {
    this.store.dispatch(LoginPageActions.login({ users }));
    console.log(this.store);
  }

  login(user: User): void {
    this.setUsersToArray();
    const isauthentcated = this.authenticate(user);
    const error = "username/paswword is wrong";
    if (isauthentcated) {
      this.store.dispatch(AuthActions.loginSuccess({ user }));
    } else {
      this.store.dispatch(AuthActions.loginFailure({ error }));
    }
  }

 

  authenticate(user: User): boolean {
    var isauthenticated = false;
    this.users.forEach(element => {
      if (user.username == element.username && user.password == element.password) {
        isauthenticated = true;
      }
    });
    return isauthenticated;
  }

  logout(): void {
    this.store.dispatch(LogoutActions.logout());
  }
}



