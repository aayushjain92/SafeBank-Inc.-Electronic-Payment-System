import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';


interface State {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  credentialsFormGroup: FormGroup;
  ssnFormGroup: FormGroup;

  states: State[] = [
    {value: 'AL', viewValue: 'Alabama'},
    {value: 'AK', viewValue: 'Alaska'},
    {value: 'AZ', viewValue: 'Arizona'},
    {value: 'AR', viewValue: 'Arkansas'},
    {value: 'CA', viewValue: 'California'},
    {value: 'CO', viewValue: 'Colorado'},
    {value: 'CT', viewValue: 'Connecticut'},
    {value: 'DE', viewValue: 'Delaware'},
    {value: 'FL', viewValue: 'Florida'},
    {value: 'GA', viewValue: 'Georgia'},
    {value: 'HI', viewValue: 'Hawaii'},
    {value: 'ID', viewValue: 'Idaho'},
    {value: 'IN', viewValue: 'Indiana'},
    {value: 'IL', viewValue: 'Illinois'},
    {value: 'IA', viewValue: 'Iowa'},
    {value: 'KS', viewValue: 'Kansas'},
    {value: 'KY', viewValue: 'Kentucky'},
    {value: 'LA', viewValue: 'Louisiana'},
    {value: 'ME', viewValue: 'Maine'},
    {value: 'MD', viewValue: 'Maryland'},
    {value: 'MA', viewValue: 'Massachusetts'},
    {value: 'MI', viewValue: 'Michigan'},
    {value: 'MN', viewValue: 'Minnisota'},
    {value: 'MS', viewValue: 'Mississipi'},
    {value: 'MO', viewValue: 'Missouri'},
    {value: 'MT', viewValue: 'Montana'},
    {value: 'NE', viewValue: 'Nebraska'},
    {value: 'NV', viewValue: 'Nevada'},
    {value: 'NH', viewValue: 'New Hampshire'},
    {value: 'NJ', viewValue: 'New Jersey'},
    {value: 'NM', viewValue: 'New Mexico'},
    {value: 'NY', viewValue: 'New York'},
    {value: 'NC', viewValue: 'North Carolina'},
    {value: 'ND', viewValue: 'North Dakota'},
    {value: 'OH', viewValue: 'Ohio'},
    {value: 'OK', viewValue: 'Oklahama'},
    {value: 'OR', viewValue: 'Oregon'},
    {value: 'PA', viewValue: 'Pennsylvania'},
    {value: 'RI', viewValue: 'Rhode Island'},
    {value: 'SC', viewValue: 'South Carolina'},
    {value: 'SD', viewValue: 'South Dakota'},
    {value: 'TN', viewValue: 'Tennessee'},
    {value: 'TX', viewValue: 'Texas'},
    {value: 'UT', viewValue: 'Utah'},
    {value: 'VT', viewValue: 'Vermont'},
    {value: 'VA', viewValue: 'Virginia'},
    {value: 'WA', viewValue: 'Washington'},
    {value: 'WV', viewValue: 'West Virginia'},
    {value: 'WI', viewValue: 'Wisconsin'},
    {value: 'WY', viewValue: 'Wyoming'},
  ];

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
  private router: Router, private service : RegisterService) { }

  user: User = new User();
  users : User[] = [];
  userExists : boolean = false;

  ngOnInit(): void {
    this.personalFormGroup = this._formBuilder.group({
      firstNameCtrl : ['', Validators.required],
      lastNameCtrl : ['', Validators.required],
      phoneNumberCtrl : ['', Validators.required, 
        // Validators.maxLength(10), 
        // Validators.minLength(10),
        // Validators.pattern("[0-9 ]{10}")
      ],
      emailIDCtrl : ['', Validators.required],
      dobCtrl: []
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

  eventSelection(event){
    alert(event.value);
    this.user.state = event.value;
    console.log(this.user.state);
   }
  hide = true;
  hideSSN = true;
  get passwordInput() { return this.credentialsFormGroup.get('password'); } 
  get ssnInput() { return this.ssnFormGroup.get('ssn'); } 


  saveUser(): void{
    //Personal info
    this.user.firstName = this.personalFormGroup.get('firstNameCtrl').value;
    this.user.lastName = this.personalFormGroup.get('lastNameCtrl').value;
    this.user.phoneNum = this.personalFormGroup.get('phoneNumberCtrl').value;
    this.user.email = this.personalFormGroup.get('emailIDCtrl').value;
    this.user.dob = this.personalFormGroup.get('dobCtrl').value;
    //Address fields
    this.user.addressLine1 = this.addressFormGroup.get('addressLine1Ctrl').value;
    this.user.addressLine2 = this.addressFormGroup.get('addressLine2Ctrl').value;
    this.user.city = this.addressFormGroup.get('cityCtrl').value;
    this.user.state = this.addressFormGroup.get('stateCtrl').value;
    this.user.zip = this.addressFormGroup.get('zipCtrl').value;
    //Password
    //base64 encoded password
    this.user.password = btoa(this.credentialsFormGroup.get('password').value);
    console.log(this.user.password);
    //SSN Field
    this.user.ssn = this.ssnFormGroup.get('ssn').value;

    //check for existing email
    this.service.getUsers().subscribe((users:User[]) => {
          this.users = users;
        })
    this.userExists = this.checkIfUserExists(this.user.email);

    if(this.userExists){
      this.router.navigate(['/register', {}]);
    }else{
      this.service.registerUser(this.user);
      this.router.navigate(['/login', {}]);
    }
  }

  checkIfUserExists(email:String) : boolean{
    var userExists : boolean;
    this.users.forEach((user) => {
      if(user.email == email){
        userExists = true;
      }else{
        userExists = false;
      }
    });
    return userExists;
  }

}
