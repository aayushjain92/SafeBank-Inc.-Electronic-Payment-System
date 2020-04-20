import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../services/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from '../model/beneficiary';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, endWith } from 'rxjs/operators';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-addbeneficiary',
  templateUrl: './addbeneficiary.component.html',
  styleUrls: ['./addbeneficiary.component.scss']
})
export class AddbeneficiaryComponent implements OnInit {
  // variables declared for using through out 
  firstName: string;
  lastName: string;
  accountNumber: string;
  nickName: string;
  routingNumber: number;
  routing: any;
  beneficiaries: any;
  panelOpenState = false;
  title = 'My Beneficiaries';
  benef: Beneficiary;
  enterVal: boolean;
  beneficiaryCheck: boolean;
  routingNumberCheck: boolean = false;
  accountNumberCheck: boolean = false;
  error: string;
  modalValue: string = undefined;
  user: User;
  auth: any;
  constructor(public rest: BeneficiaryService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private store: Store<fromAuth.State>
  ) { }


  ngOnInit(): void {
    this.initializeData();
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  initializeData() {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      console.log('User found on Beneficiary');
    }
    console.log("beneficary" + this.user.account.AccountNumber);
  }

  // function to check the routing number
  check() {
    // calling external api for verifying routing number
    const endpoint = 'https://www.routingnumbers.info/api/name.json?rn=';
    this.routingNumber = this.routingNumber;

    this.http.get(`${endpoint + this.routingNumber}`)
      .subscribe(data => {
        this.routing = data;
        console.log(this.routing)

        // status code filtered and then allowed user to register or add a beneficiary
        if (this.routing["code"] === 200) {
          this.routingNumberCheck = true;
          this.enterVal = false;
          console.log("success");
        } else if (this.routing["code"] === 404) {
          this.routingNumberCheck = false;
          this.enterVal = true;
          this.error = "Incorrect Routing Number";
          let timeoutId = setTimeout(() => {
            this.enterVal = false;
          }, 2000);
          console.log("fail");
        } else if (this.routing["code"] === 400) {
          this.routingNumberCheck = false;
          this.enterVal = true;
          this.error = "Routing Number should be 9 digits";
          let timeoutId = setTimeout(() => {
            this.enterVal = false;
          }, 3000);
        }

      });


  }

  // get beneficiaries from backend
  getbeneficiary() {
    this.rest.getbeneficiary(this.user.account.AccountNumber)
      .subscribe(data => {
        this.beneficiaries = data;

      });


  }


  // saving beneficiary to the database
  savebeneficiary() {
    this.rest.getBeneficiarybyaccountNumber(this.accountNumber)
      .subscribe(data => {
        this.routing = data;
        // checking if the beneficary already exists
        console.log("this", data);
        if (data) {
          console.log("this", data);
          this.beneficiaryCheck = true;
          this.error = "Beneficiary already exists";
          let timeoutId = setTimeout(() => {
            this.beneficiaryCheck = false;
          }, 5000);
        } else {
          this.beneficiaryCheck = false;
          this.benef = new Beneficiary(this.firstName, this.lastName, this.accountNumber, this.nickName, this.routingNumber, this.user.account.AccountNumber);

          this.rest.savebeneficiary(this.benef)
            .subscribe(data => {
              this.beneficiaries = data;
              this.modalValue = data.firstName + " has been added successfully";
            });
        }
      });

  }





}
