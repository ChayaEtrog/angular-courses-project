import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { CoursesService } from '../../services/courses.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [MatInputModule,
            MatButtonModule,
            MatFormFieldModule,
            MatSelectModule,
            MatCardModule,
            MatToolbarModule,
            MatIconModule,
            ReactiveFormsModule,
            LessonFormComponent
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  @Output() closeForm = new EventEmitter<any>();
  courseForm: FormGroup;
  isOpenLessons:boolean = false;

  constructor(private fb: FormBuilder, private lessonsService: LessonsService,private coursesService:CoursesService) { 
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      teacherId: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.coursesService.createCourse(this.courseForm.value.title,this.courseForm.value.description,this.courseForm.value.teacherId).subscribe(
        (response) => {
          this.closeForm.emit();
          console.log('Course added successfully', response);
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  closeLessonsForm(): void {
    this.isOpenLessons = false;
  }
}
