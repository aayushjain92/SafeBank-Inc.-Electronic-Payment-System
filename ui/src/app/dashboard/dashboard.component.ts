import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  
  constructor( private store: Store<fromAuth.State>) { }

  ngOnInit(): void {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    this.user = auth.auth.status.user;
    
    //route to login
    
    //Call get User...

    //Call beneficiary details for user
  }

}
