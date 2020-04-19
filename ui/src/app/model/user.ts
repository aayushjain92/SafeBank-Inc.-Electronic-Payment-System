import { Account } from 'src/app/model/account.model';
//Class for bank customer
export class User {
    firstName: string;
    lastName: string;
    dob: Date;
    age: number;
    email: string;
    phoneNum : number;
    accountNumber: number;
    routingNumber: number;
    accountType : string;
    ssn: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    username: string;
    password: string;
    account: Account

    // Constructor
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}
