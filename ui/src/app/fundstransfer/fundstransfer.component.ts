import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'jspdf-autotable';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import {FundstransferService} from '../services/fundstransfer.service';
import { Transaction } from '../model/transaction.model';


@Component({
  selector: 'app-fundstransfer',
  templateUrl: './fundstransfer.component.html',
  styleUrls: ['./fundstransfer.component.scss']
})
export class FundstransferComponent implements OnInit {
  title = 'Funds Transfer';
  transaction: Transaction;
  constructor(public rest: FundstransferService, private route: ActivatedRoute, private router: Router, private store: Store<fromAuth.State>) {
    this.transaction = new Transaction();
  }
  user: User;
  auth: any;
  displayText: string = undefined;
  panelOpenState = false;

  ngOnInit(): void {
    this.initializeTable();    
  }

  initializeTable() {
    let self = this;
    this.store.subscribe(val => self.auth = val);
    this.user = this.auth.auth.status.user;
  }

  // pass the transaction model to FundstransferService for crediting the amount
  credit(transaction : Transaction): void{
    this.transaction.ownerAccountNumber =  this.user.account.AccountNumber;
    
    console.log(transaction);
    this.rest.creditAmount(transaction).subscribe((data) => {
      this.displayText = transaction.ownerAccountNumber + ` has been credited successfully by USD ${transaction.amount}`;
    }, (err) => {
      console.log(err);
    });
  }

  // pass the transaction model to FundstransferService for debiting the amount
  debit(transaction : Transaction): void{
    this.transaction.ownerAccountNumber =  this.user.account.AccountNumber;
    
    console.log(transaction);
    this.rest.debitAmount(transaction).subscribe((data) => {
      this.displayText = transaction.ownerAccountNumber + ` has been debited successfully by USD ${transaction.amount}`;
    }, (err) => {
      console.log(err);
    });
  }

  // the confirmation modal
  toggleModal() {
    document.getElementById("myModal").style.display = "none";
    this.displayText = undefined;
    return false;
  }



}
