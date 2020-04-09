import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, CanActivate, Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { RegisterNavBarComponent} from './signup/register-nav-bar/register-nav-bar.component';
import { PersonalDetailsComponent} from './signup/personal-details/personal-details.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { RegisterComponent } from './signup/register/register.component';
import { AddressDetailsComponent } from './signup/address-details/address-details.component';
import { AccountDetailsComponent } from './signup/account-details/account-details.component';
import { CredentialDetailsComponent } from './signup/credential-details/credential-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BeneficiaryComponent,
    AddbeneficiaryComponent,
    RegisterNavBarComponent,
    PersonalDetailsComponent,
    LandingPageComponent,
    RegisterComponent,
    AddressDetailsComponent,
    AccountDetailsComponent,
    CredentialDetailsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule
  ],

  providers: [],
  bootstrap: [AppComponent],

})


export class AppModule { }
