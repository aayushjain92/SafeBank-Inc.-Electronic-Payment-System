import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  @Input()
  user : User;

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.user.firstName)
  }

}
