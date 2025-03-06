import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule,MatCardModule,MatToolbarModule,MatIconModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent  {

  @Output() formClosed = new EventEmitter<void>();
  registerForm: FormGroup;
  userTypes: string[]=["student", "teacher", "admin"]
  
    constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required]
      });
    }
  
    onSubmit(): void {
      if (this.registerForm.valid) {
        this.authService.register(
          this.registerForm.value.name,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.role
        ).subscribe(response => {
          this.router.navigate(['/login']);
          this.formClosed.emit();
        }, error => {
          console.error('Registration failed', error);
        });
      }
    }
}
