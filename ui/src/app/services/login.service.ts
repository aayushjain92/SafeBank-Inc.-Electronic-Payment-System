import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginPageActions } from './../store/actions';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private store: Store<fromAuth.State>) { }

  logIn(user: User): Observable<any> {
    return this.http.post<User>(API_URL + 'login', {user});
  }

  loadStore(): void{
    const users$: Observable<Array<User>> = this.http.get<Array<User>>(API_URL + 'login');
    users$.subscribe(users => {
      this.store.dispatch(LoginPageActions.login({ users }));
    });
  }
}

  

  