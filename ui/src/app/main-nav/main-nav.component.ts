import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  modalValue: string = undefined;
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private service : LoginService, 
    private store: Store<fromAuth.State>, private router: Router) {
      let loggedInUser;
    this.store.subscribe(val => loggedInUser = val);
    if (loggedInUser.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = loggedInUser.auth.status.user;
    }
    }

  logoutPopUp(){
    this.modalValue = "Are you sure yo want to logout?";
  }

  logout(){
    this.service.logout(this.user);
  }

  // the confirmation modal
  toggleModal() {
    document.getElementById("myModal").style.display = "none";
    this.modalValue = undefined;
    return false;
  }
}
