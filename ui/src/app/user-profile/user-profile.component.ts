import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegisterService } from 'src/app/services/register.service';

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

  constructor(private _formBuilder: FormBuilder, private service : RegisterService) {}

  ngOnInit() {
    this.personalFormGroup = this._formBuilder.group({
      phoneNumberCtrl : ['', Validators.required]
    });
    this.addressFormGroup = this._formBuilder.group({
      addressLine1Ctrl: ['', Validators.required],
      addressLine2Ctrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      stateCtrl: ['', Validators.required],
      zipCtrl: ['', Validators.required]
    });
    this.credentialsFormGroup = this._formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(9)])
    });
    this.ssnFormGroup = this._formBuilder.group({
      ssn: new FormControl('', [Validators.required] )
    })
  }

  hide = true;
  hideSSN = true;
  get passwordInput() { return this.credentialsFormGroup.get('password'); } 
  get ssnInput() { return this.ssnFormGroup.get('ssn'); } 

  user:User;
  updateUser(){
    //Personal info
    // this.user.firstName = this.personalFormGroup.get('firstNameCtrl').value;
    // this.user.lastName = this.personalFormGroup.get('lastNameCtrl').value;
    // this.user.phoneNum = this.personalFormGroup.get('phoneNumberCtrl').value;
    // this.user.email = this.personalFormGroup.get('emailIDCtrl').value;
    // this.user.dob = new Date();
    // //Address fields
    // this.user.addressLine1 = this.addressFormGroup.get('addressLine1Ctrl').value;
    // this.user.addressLine2 = this.addressFormGroup.get('addressLine2Ctrl').value;
    // this.user.city = this.addressFormGroup.get('cityCtrl').value;
    // this.user.state = this.addressFormGroup.get('stateCtrl').value;
    // this.user.zip = this.addressFormGroup.get('zipCtrl').value;
    // //Password
    // //base64 encoded password
    // this.user.password = btoa(this.credentialsFormGroup.get('password').value);
    // console.log(this.user.password);
    // //SSN Field
    // this.user.ssn = this.ssnFormGroup.get('ssn').value;

  }

}
