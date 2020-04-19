import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { RegisterNavBarComponent } from './signup/register-nav-bar/register-nav-bar.component';
import { PersonalDetailsComponent } from './signup/personal-details/personal-details.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { RegisterComponent } from './signup/register/register.component';
import { AddressDetailsComponent } from './signup/address-details/address-details.component';
import { AccountDetailsComponent } from './signup/account-details/account-details.component';
import { CredentialDetailsComponent } from './signup/credential-details/credential-details.component';
import { LoginComponent } from './login/login-component/login.component';
import { LoginFormComponent } from './login/login-form/login-form/login-form.component';
import * as fromAuth from './store/reducers';
import { LogoutConfirmationDialogComponent } from './login/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { AuthEffects } from './store/effects/auth.effects';
import { TransactiontableComponent } from './transactiontable/transactiontable.component';
import { DashboardComponent } from './dashboard/dashboard.component';


//Angular material design
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
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
    CredentialDetailsComponent,
    LoginComponent,
    LoginFormComponent,
    LogoutConfirmationDialogComponent,
    TransactiontableComponent,
    DashboardComponent,
    MainNavComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    MatSliderModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],

  providers: [],
  bootstrap: [AppComponent],

})


export class AppModule { }
