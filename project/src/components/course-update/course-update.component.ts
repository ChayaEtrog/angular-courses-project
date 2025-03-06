import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [MatInputModule,
            MatButtonModule,
            MatFormFieldModule,
            MatSelectModule,
            MatCardModule,
            MatToolbarModule,
            MatIconModule,
            ReactiveFormsModule,
  ],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent implements OnChanges{
  @Input() course: any | null =  {}; 
  @Output() courseUpdated = new EventEmitter<void>(); 

  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
    this.courseForm = this.fb.group({
      title: [this.course.title,[Validators.required, Validators.minLength(3)]],
      description: [this.course.description, Validators.required],
      teacherId: [this.course.teacherId, Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.courseForm.patchValue({
        title: this.course.title || '',
        description: this.course.description || '',
        teacherId: this.course.teacherId || ''
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid || !this.course?.id) return;

    const updatedCourse = { ...this.course, ...this.courseForm.value };

    this.coursesService.updateCourse(updatedCourse.id, updatedCourse).subscribe(() => {
      this.courseUpdated.emit(); 
    });
  }
}
