import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
// import { MainNavComponent }  from '../main-nav/main-nav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;

  // @ViewChild(MainNavComponent) mainNavModal;

  constructor(private store: Store<fromAuth.State>, private router: Router) { }


  ngOnInit(): void {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      console.log('User found in dashboard');
      console.log(this.user);
      console.log('User found' + this.user.firstName);
      //console.log('Account number: ' + this.user.account.AccountNumber);
      // this.mainNavModal.openModal();
    }
    console.log("heere", this.user)

    //route to login


    //Call beneficiary details for user
  }

}
