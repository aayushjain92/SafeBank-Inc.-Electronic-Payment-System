// Class for the Beneficiary 
export class Beneficiary {
    firstName: string;
    lastName: string;
    accountNumber: number;
    nickName: string
    routingNumber: number
    // Constructor
    constructor(firstName: string,
        lastName: string,
        accountNumber: number,
        nickName: string,
        routingNumber: number
    ) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.accountNumber = accountNumber;
        this.nickName = nickName;
        this.routingNumber = routingNumber;
    }
}
