import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  @Input()
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
