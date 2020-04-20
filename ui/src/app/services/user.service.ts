import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_URL + 'users');
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(API_URL + 'users' + user.email, user);
  }
}
