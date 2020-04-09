import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, endWith } from 'rxjs/operators';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { Beneficiary } from '../model/beneficiary'

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   })
// };

const endpoint = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }


  // end point to get all items
  getbeneficiary(): Observable<any> {

    return this.http.get(endpoint + 'beneficiary');
  }


  // end point to save all beneficiary
  savebeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {

    return this.http.post<Beneficiary>(endpoint + 'beneficiary', beneficiary);
  }

  // end point to delete beneficiary
  deleteBeneficiary(accountNumber): Observable<Beneficiary> {

    return this.http.delete<Beneficiary>(`${endpoint + 'beneficiary'}/${accountNumber}`);
  }

  getBeneficiarybyaccountNumber(accountNumber): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${endpoint + 'beneficiary'}/${accountNumber}`);
  }
}
