import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { PersonalDetailsComponent } from './signup/personal-details/personal-details.component';
import { AddressDetailsComponent } from './signup/address-details/address-details.component';
import { AccountDetailsComponent } from './signup/account-details/account-details.component';
import { CredentialDetailsComponent } from './signup/credential-details/credential-details.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { RegisterComponent } from './signup/register/register.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'register', component: RegisterComponent,
    children:
      [
        { path: 'personalDetails', component: PersonalDetailsComponent },
        { path: 'demographicDetails', component: AddressDetailsComponent },
        { path: 'accountDetails', component: AccountDetailsComponent },
        { path: 'credentials', component: CredentialDetailsComponent }
      ]
  },
  { path: 'beneficiary', component: BeneficiaryComponent },
  { path: 'addbeneficiary', component: AddbeneficiaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
