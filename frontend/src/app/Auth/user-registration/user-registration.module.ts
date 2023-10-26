import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { UserRegistrationComponent } from './user-registration.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [FormsModule, CommonModule, ReactiveFormsModule 
  ], 
})
export class UserRegistrationModule {}
