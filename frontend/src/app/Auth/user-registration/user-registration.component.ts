import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value)
        .subscribe(
          response => {
            console.log('Registration successful', response);

            // You can redirect the user or show a success message here
            this.router.navigate(['/']);

          },
          error => {
            console.error('Registration failed', error);
          }
        );
    }
  }
}
