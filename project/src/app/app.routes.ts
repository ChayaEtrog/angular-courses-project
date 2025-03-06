import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { CourseListComponent } from '../components/course-list/course-list.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes =[
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginFormComponent},
    { path: 'courses', component: CourseListComponent,canActivate:[authGuard]}
];
