import { Component, OnInit } from '@angular/core';
import { TransactionsdetailsService } from '../services/transactionsdetails.service';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {

  autoTable: (options: UserOptions) => jsPDF;
}


@Component({
  selector: 'app-transactiontable',
  templateUrl: './transactiontable.component.html',
  styleUrls: ['./transactiontable.component.scss']
})
export class TransactiontableComponent implements OnInit {
  accountNumber: 1234567890;
  transactions: any;
  constructor(public rest: TransactionsdetailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getbeneficiary();
  }

  // get 5 txns
  getbeneficiary() {
    this.rest.getTransactionbyaccountNumber(1234567890)
      .subscribe(data => {
        this.transactions = data;

      });

  }

  // for generating pdf
  getpdf() {
    this.rest.getpdf(1234567890)
      .subscribe(
        data => this.pdfdata(data)

      );
  }

  // generating pdf format in tabular form
  pdfdata(pdf) {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.text(30, 20, "Exterminators");
    doc.autoTable({
      head: [['Account Number', 'Type', 'Amount', 'Transaction Date']],
      body: pdf.map(transaction => {
        return [transaction["ownerAccountNum"], transaction["type"], transaction["amount"], transaction["transactionDate"]]
      })
    })

    doc.save("Transaction Details");
  }
}
