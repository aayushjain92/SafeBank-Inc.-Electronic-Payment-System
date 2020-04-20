import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cc-dash',
  templateUrl: './cc-dash.component.html',
  styleUrls: ['./cc-dash.component.scss']
})
export class CcDashComponent implements OnInit {
  user: User;
  users: User[];
  displayedColumns: string[] = ['name', 'email', 'phone', 'accountNum', 'currentBalance', 'role'];
  constructor(private store: Store<fromAuth.State>, 
    private router: Router,
    private service: UserService) { }

  ngOnInit(): void {
    let auth;
    console.log(this.store);
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      console.log('User found in Customer Care dashboard');
      this.service.getAllUser()
        .subscribe(users => this.users = users); 
    }

    

  }
}
