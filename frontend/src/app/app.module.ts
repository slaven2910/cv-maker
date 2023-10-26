import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegistrationModule } from './Auth/user-registration/user-registration.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule, 
    UserRegistrationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
