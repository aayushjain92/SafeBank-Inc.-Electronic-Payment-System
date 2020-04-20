import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { User } from 'src/app/model/user';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  credentialsFormGroup: FormGroup;
  ssnFormGroup: FormGroup;
  panelOpenState = false;
  user: User;

  constructor(private store: Store<fromAuth.State>, private _formBuilder: FormBuilder, 
    private service : UserService, private router: Router) {}

  ngOnInit() {
    let authState;
    this.store.subscribe(val => authState = val);
    if (authState.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = authState.auth.status.user;
      console.log(JSON.stringify(this.user));
    }
    
    this.personalFormGroup = this._formBuilder.group({
      firstNameCtrl : ['', Validators.required],
      lastNameCtrl : ['', Validators.required],
      phoneNumCtrl : ['', Validators.required ],
      emailIDCtrl : ['', Validators.required],
      dobCtrl : []
    });

    this.addressFormGroup = this._formBuilder.group({
      addressLine1Ctrl: ['', Validators.required],
      addressLine2Ctrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      zipCtrl: ['', Validators.required]
    });

    this.credentialsFormGroup = this._formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern("")])
    });

    this.ssnFormGroup = this._formBuilder.group({
      ssn: new FormControl('', [Validators.required] ),
      accNumCtrl: new FormControl(),
      routingNumCtrl : new FormControl()
    })
    
    this.personalFormGroup.patchValue({
      firstNameCtrl : this.user.firstName,
      lastNameCtrl : this.user.lastName,
      emailIDCtrl : this.user.email,
      phoneNumCtrl : this.user.phoneNum,
      dobCtrl: this.user.dob
    });

    this.addressFormGroup.patchValue({
      addressLine1Ctrl: this.user.addressLine1,
      addressLine2Ctrl: this.user.addressLine2,
      cityCtrl: this.user.city,
      stateCtrl: this.user.state,
      zipCtrl: this.user.zip
    });

    this.credentialsFormGroup.patchValue({
      password: this.user.password
    });

    this.ssnFormGroup.patchValue({
      ssn: this.user.ssn,
      accNumCtrl: this.user.account.AccountNumber,
      routingNumCtrl : this.user.account.routingNumber
    });
  }

  hide = true;
  hideSSN = true;
  get passwordInput() { return this.credentialsFormGroup.get('password'); } 
  get ssnInput() { return this.ssnFormGroup.get('ssn'); } 

  updateUser(){
    this.user = new User();
    //Personal info
    //this.user.phoneNum = this.personalFormGroup.get('phoneNumCtrl').value;
    this.user.firstName = this.personalFormGroup.getRawValue().firstNameCtrl;
    this.user.lastName = this.personalFormGroup.getRawValue().lastNameCtrl;
    this.user.email = this.personalFormGroup.getRawValue().emailIDCtrl;
    this.user.dob = this.personalFormGroup.getRawValue().dobCtrl;

    //Address fields 
    this.user.addressLine1 = this.addressFormGroup.get('addressLine1Ctrl').value;
    this.user.addressLine2 = this.addressFormGroup.get('addressLine2Ctrl').value;
    this.user.city = this.addressFormGroup.get('cityCtrl').value;
    this.user.state = this.addressFormGroup.get('stateCtrl').value;
    this.user.zip = this.addressFormGroup.get('zipCtrl').value;

    // base64 encoded password
    this.user.password = btoa(this.credentialsFormGroup.get('password').value);

    //update user service call
    this.service.updateUser(this.user).subscribe(
      (user: User) => {
        this.router.navigate(['/dashboard']);
      }
    );
    
  }

}
