import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [RegisterFormComponent, LoginFormComponent, MatButtonModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(public userService: AuthService) { }

  isLogin:boolean = this.userService.isLoggedIn();
  isFormLoginOpen: boolean = false;
  isFormRegisterOpen: boolean = false;

  FormRegisterClose() {
    // this.router.navigate(['/login']);
    this.isFormRegisterOpen = false;
  }

  FormLoginClose() {
    this.isFormLoginOpen = false;
  }
}
