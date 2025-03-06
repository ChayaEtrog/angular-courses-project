import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    CourseDetailsComponent,
    CourseFormComponent,
    LessonFormComponent,
    CommonModule
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  loading: boolean = true;
  courseId: number | null = null;

  isOpenCourseForm: boolean = false;
  isOpenLessonForm: boolean = false;

  constructor(private coursesService: CoursesService, public authService:AuthService) { }

  ngOnInit(): void {
    this.coursesService.courses$.subscribe(courses => {
      this.courses = courses;
    });
    this.coursesService.getCourses().subscribe();
  }

  closeLessonsForm():void{
    this.isOpenLessonForm = false; 
  }
  closeCoursesForm():void{
    this.isOpenCourseForm = false; 
  }

  courseDeleted(){
    this.courseId=null;
  }
}
