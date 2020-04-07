import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { RegisterNavBarComponent } from './signup/register-nav-bar/register-nav-bar.component';
import { PersonalDetailsComponent } from './signup/personal-details/personal-details.component';

const routes: Routes = [
  { path: 'Register', component: RegisterNavBarComponent },
  { path: 'Personal_Details', component: PersonalDetailsComponent },
  { path: 'beneficiary', component: BeneficiaryComponent },
  { path: 'addbeneficiary', component: AddbeneficiaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
