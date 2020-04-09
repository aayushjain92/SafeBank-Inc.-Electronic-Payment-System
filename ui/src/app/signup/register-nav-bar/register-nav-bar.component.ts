import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { Button } from 'protractor';

@Component({
  selector: 'app-register-nav-bar',
  templateUrl: './register-nav-bar.component.html',
  styleUrls: ['./register-nav-bar.component.scss']
})
export class RegisterNavBarComponent implements OnInit {

  @Input()
  user : User;

  @Input()
  button : string;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.button);
  }

  getPersonalButton(): string{
    this.button = 'personal';
    return this.button;
  }

  getAddressButton(): string{
    this.button = 'address';
    return this.button;
  }

  getAccountButton(): string{
    this.button = 'account';
    return this.button;
  }

  getCredsButton(): string{
    this.button = 'creds';
    return this.button;
  }

}
