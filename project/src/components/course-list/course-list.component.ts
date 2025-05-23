import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

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
export class CourseListComponent implements OnInit, OnDestroy {
  courses: any[] = [];
  loading: boolean = true;
  courseId: number | null = null;
  isOpenCourseForm: boolean = false;
  isOpenLessonForm: boolean = false;
  refreshTriger: boolean = false;
  destroy$ = new Subject<void>();

  constructor(private coursesService: CoursesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().pipe(takeUntil(this.destroy$)).subscribe();

    this.coursesService.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }

  closeLessonsForm(): void {
    this.isOpenLessonForm = false;
    this.refreshTriger=true;
  }
  closeCoursesForm(): void {
    this.isOpenCourseForm = false;
  }

  courseDeleted() {
    this.courseId = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
