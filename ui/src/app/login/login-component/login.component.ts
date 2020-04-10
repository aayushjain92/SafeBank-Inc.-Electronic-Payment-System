import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromAuth from './../../store/reducers';
import { Store, select } from '@ngrx/store';
import { AuthActions } from './../../store/actions';
import { User } from './../../model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();

  // pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  // error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>, private loginApi: LoginService) {}

  ngOnInit() {
    this.loginApi.loadStore();
  }

  onSubmit(user : User) {
    this.store.dispatch(AuthActions.loginSuccess({user}));
  }

}
