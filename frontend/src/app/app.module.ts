import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegistrationModule } from './Auth/user-registration/user-registration.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { CreateCvComponent } from './pages/create-cv/create-cv.component';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLoginComponent,
    NavbarComponent,
    FooterComponent,
    CvFormComponent,
    CreateCvComponent,
    CvPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    UserRegistrationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
