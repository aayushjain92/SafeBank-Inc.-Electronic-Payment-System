import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-donate-covid',
  templateUrl: './donate-covid.component.html',
  styleUrls: ['./donate-covid.component.scss']
})
export class DonateCovidComponent implements OnInit {
  donateFormGroup : FormGroup
  user: User;

  constructor(private store: Store<fromAuth.State>, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      console.log('User found in donatecovid');
      console.log(this.user);
      console.log('User found' + this.user.firstName);
      console.log('Account number: ' + this.user.account.AccountNumber);
      // this.mainNavModal.openModal();
    }
    this.donateFormGroup = this._formBuilder.group({
      amountCtrl : ['', Validators.required],
    });
  }

  saveTransaction(): void {
    //Save transaction code goes here
  }
}


