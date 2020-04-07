import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterNavBarComponent } from './register-nav-bar/register-nav-bar.component';
import { PersonalDetailsComponent } from './signup/personal-details/personal-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterNavBarComponent,
    PersonalDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
