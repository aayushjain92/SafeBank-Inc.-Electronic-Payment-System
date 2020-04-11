import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  
  @Input()
  user:User;

  @Input()
  button:string;

  title = "PLEASE PROVIDE YOUR PERSONAL DETAILS";

  constructor() { }

  ngOnInit(): void {
  }

  today = new Date();
  
  setBtnStatus(): string{
    const dob = new Date(this.user.dob);
    if(this.user.age == null){
    this.user.age = this.today.getFullYear() - dob.getFullYear();
    }
    this.button = "personal_save";
    return this.button;
  }
}
