import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { UserRegistrationComponent } from './user-registration.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [FormsModule, CommonModule], 
})
export class UserRegistrationModule {}
