import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CourseUpdateComponent } from '../course-update/course-update.component';
import { ShowLessonsComponent } from '../show-lessons/show-lessons.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { IconPipe } from '../../pipes/icon.pipe';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    CourseUpdateComponent,
    ShowLessonsComponent,
    ErrorMessageComponent,
    IconPipe
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnChanges {
  @Input() courseId: number = -1;
  @Output() courseDeleted = new EventEmitter<any>();
  courseDetails: any = null;
  isLoading = false;
  errorMessage: string = '';
  isWantUpdate = false;
  teacherName: string = '';
  showLessons: boolean = false;
  isStudentEnrolled: Boolean = false;

  buttonJoin:string="join";
  buttonLeave:string="leave";

  constructor(private courseService: CoursesService, public authService: AuthService) {  this.checkStudentEnrollment(); }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courseId'] && this.courseId !== -1) {
      this.fetchCourseDetails();
      this.fetchTeacher();
      this.checkStudentEnrollment();
    }
  }

  fetchCourseDetails() {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourseDetails(this.courseId).subscribe({
      next: (data) => {
        this.courseDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'error fetching course details';
        console.error('Error fetching course details:', err);
        this.isLoading = false;
      }
    });
  }

  fetchTeacher() {
    this.authService.getUserById(this.courseDetails.teacherId).subscribe(user => {
      this.teacherName = user.name;
    });
  }

  closeUpdateCourse() {
    this.isWantUpdate = false;
    this.fetchCourseDetails();
    this.fetchTeacher();
  }

  wantUpdate() {
    this.isWantUpdate = true;
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.courseDeleted.emit();
      },
      (error) => {
        console.error("Error deleting course", error);
      }
    );
  }

  joinToCourse() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        const userId = user.id;
        this.isLoading = true;
        this.errorMessage = '';

        this.courseService.enrollStudent(this.courseId, userId).subscribe({
          next: (response) => {
            this.isStudentEnrolled = true;
            console.log("Student successfully enrolled in the course", response);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'Error enrolling in course';
            this.isLoading = false;
          }
        });
      }
    });
  }

  leaveCourse() {
    this.authService.currentUser.subscribe({
      next: (user) => {

        const userId = user.id;
        this.isLoading = true;
        this.errorMessage = '';

        this.courseService.unenrollStudent(this.courseId, userId).subscribe({
          next: (response) => {
            this.isStudentEnrolled = false;
            console.log("Student successfully unenrolled in the course", response);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'Error unenrolling in course';
            console.error('Error unenrolling in course:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
  checkStudentEnrollment() {
    this.isLoading = true;
    this.authService.currentUser.subscribe((user: any) => {
        this.courseService.getCoursesByStudentId(user.id).subscribe(
          (courses: any[]) => {         
            console.log(courses);
               
            this.isStudentEnrolled = courses.some(course => course.id === this.courseId);
            this.isLoading = false;
          },
          (error) => {
            this.errorMessage ='we didnt succeed to get courses of this student';
            this.isLoading = false;
          }
        );
    });
  }

}

