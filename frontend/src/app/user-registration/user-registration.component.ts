import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { User } from '../models/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user: User = {
    username: '',
    email: '', // Add the email property
    password: '',
  };

  // Access the registrationForm
  registrationForm!: NgForm;

  registerUser(form: NgForm){
    // Simulate registration (replace with actual API call when the backend is set up)
    if (form.valid) {
      console.log('User registered:', this.user);
      // You can send the user data to the backend here
    } else {
      console.log('Form validation failed.');
    }
  }
}
