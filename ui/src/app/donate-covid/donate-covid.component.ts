import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Transaction } from '../model/transaction.model';
import { FundstransferService } from '../services/fundstransfer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-donate-covid',
  templateUrl: './donate-covid.component.html',
  styleUrls: ['./donate-covid.component.scss']
})
export class DonateCovidComponent implements OnInit {
  donateFormGroup : FormGroup
  user: User;
  transaction: Transaction;
  constructor(private store: Store<fromAuth.State>, 
    private router: Router, private _formBuilder: FormBuilder, 
    public rest: FundstransferService, private _snackBar: MatSnackBar ) { 
      this.transaction = new Transaction();
    }

  ngOnInit(): void {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      console.log('User found in donatecovid');
      // this.mainNavModal.openModal();
    }
    this.donateFormGroup = this._formBuilder.group({
      amountCtrl : ['', Validators.required],
    });
  }

  // pass the transaction model to FundstransferService for debiting the amount
  debit(transaction : Transaction): void{
    this.transaction.ownerAccountNum =  this.user.account.AccountNumber;
    this.transaction.category = 'Donation';
    console.log(transaction);
    this.rest.debitAmount(transaction).subscribe((data) => {
      this.openSnackBar(transaction.ownerAccountNum + ` 
      has been debited successfully by USD ${transaction.amount}`
      , 'Dismiss');
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}


