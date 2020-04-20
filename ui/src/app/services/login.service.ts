import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginPageActions, AuthActions, LogoutActions } from './../store/actions';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[];

  constructor(private http: HttpClient, 
    private store: Store<fromAuth.State>,
    private router: Router) { }

  getAllUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_URL + 'login');
  }

  setUsersToArray(): void {
    this.getAllUser().subscribe((users:User[]) => {
      this.users = users;
    })
  }

  getUserByEmail(email : string): Observable<User> {
    return this.http.get<User>(API_URL + 'login/' + email);
  }

  loadUsers(): void {
    this.setUsersToArray();
    this.loadStickiesIntoStore(this.users);
  }

  private loadStickiesIntoStore(users: Array<User>): void {
    this.store.dispatch(LoginPageActions.login({ users }));
    console.log("Initial store load:"+ this.store);
  }

  login(user: User): void {
    console.log('In login service >>>');
    console.log(user);
    this.setUsersToArray();
    console.log('Store on login click after users load>>>');
    console.log(this.store);
    console.log(JSON.stringify(this.users.toString()));
    const isauthentcated = this.authenticate(user);
    const error = "Email/paswword is incorrect. Please try again.";
    if (isauthentcated) {
      //Fetching entire user object
      this.getUserByEmail(user.email).subscribe((userDetails:User) => {
        console.log('Inside subscription');
        console.log(userDetails);
        user = userDetails;
        console.log('After enrichment>>');
        console.log(user);
        this.store.dispatch(AuthActions.loginSuccess({ user }));
        // console.log("this.store.getState(): "+ this.store.);
        // this.store.subscribe(function() {
        //   localStorage.setItem('state', JSON.stringify(this.store.getState()));
        // })      
        //how to use state in dashboard and other screens
        if(user.role != null && user.role === 'customercare'){
          this.router.navigate(['/ccdashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        
        console.log('User added>>>');
        console.log(this.store);
      })
    } else {
      this.store.dispatch(AuthActions.loginFailure({ error }));
      //Handle error scenario
      this.router.navigate(['/login']);
    }
  }

  authenticate(user: User): boolean {
    console.log('Authenticating');
    let isauthenticated = false;
    this.users.forEach(element => {
      console.log(element.email + ' ' + atob(element.password));
      //Decoding the base64 password returned
      if (user.email == element.email && user.password == atob(element.password)) {
        //Found the user. Marking him authenticated.
        console.log('Found the user and the password matched as well!');
        isauthenticated = true;
        return isauthenticated;
      }
    });
    console.log('Auth failed: ' + isauthenticated);
    return isauthenticated;
  }

  updateLastLogin(email : string){
    this.http.put(API_URL + 'login/' + email + '/lastlogin', {})
    .subscribe((response: any) => {
      console.log('Last Login time updated in DB');
    });
  } 

  logout(user: User): void {
    this.updateLastLogin(user.email);
    console.log("after updateLastLogin inside login service logout method: ");
    //check if updateLastLogin is successful
    this.store.dispatch(LogoutActions.logout());
    this.router.navigate(['/']);
  }
}



