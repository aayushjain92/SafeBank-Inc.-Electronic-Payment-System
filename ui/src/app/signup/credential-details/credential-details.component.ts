import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { RegisterService } from 'src/app/services/register.service';
import { userInfo } from 'os';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credential-details',
  templateUrl: './credential-details.component.html',
  styleUrls: ['./credential-details.component.scss'],
  providers: [RegisterService]
})
export class CredentialDetailsComponent implements OnInit {

  @Input()
  user: User;

  users: User[] = [];
  
  constructor(private service : RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  getUsers():void {
    this.service.getUsers().subscribe(users => {
        this.users = users;
      });
  }

  addUser(user: User): void{
    this.service.registerUser(user);
    window.alert("Account added successfully");
    this.router.navigateByUrl("/");
  }
}
