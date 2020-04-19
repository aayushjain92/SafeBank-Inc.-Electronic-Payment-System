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

constructor(public rest: FundstransferService, private route: ActivatedRoute, private router: Router, private store: Store<fromAuth.State>) { }
  user: User;
  auth: any;
  displayText: string = undefined;
  transaction: Transaction;
  panelOpenState = false;

  ngOnInit(): void {
    this.initializeTable();
    //this.getbeneficiary();
  }

  initializeTable() {
    let self = this;
    //console.log(this.store);
    this.store.subscribe(val => self.auth = val);
    this.user = this.auth.auth.status.user;
    this.transaction.ownerAccountNumber =  this.user.account.AccountNumber;
  }


  credit(transaction : Transaction): void{
    //transaction.ownerAccountNumber = this.user.account.AccountNumber;
    //this.rest.creditAmount(transaction);
    // this.router.navigate(['/login', {}]);

    console.log(transaction);
    this.rest.creditAmount(transaction).subscribe((data) => {
      this.displayText = transaction.ownerAccountNumber + ` has been credited successfully by USD {transaction.amount}`;
      console.log(transaction);
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
