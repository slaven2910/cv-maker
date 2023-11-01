import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserRegistrationComponent } from './Auth/user-registration/user-registration.component';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { CreateCvComponent } from './pages/create-cv/create-cv.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'create-cv', component: CvFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
