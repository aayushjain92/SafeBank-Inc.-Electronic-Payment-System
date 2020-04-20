import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model'
import { environment } from 'src/environments/environment';
const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FundstransferService {

  constructor(private http: HttpClient) { }


  // end point to credit the amount
  creditAmount(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(endpoint + 'credit', transaction);
  }

  // end point to debit the amount
  debitAmount(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(endpoint + 'debit', transaction);
  }

  // // end point to get a list of beneficiaries
  // getbeneficiary(accountNumber : string): Observable<any> {
  //   return this.http.get(`${endpoint + 'beneficiaries'}/${accountNumber}`);
  // }

  // end point to transfer the amount
  transferAmount(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(endpoint + 'transfer', transaction);
  }


}
