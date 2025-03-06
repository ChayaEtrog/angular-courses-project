import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
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
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  @Output() closeForm=new EventEmitter<any>();
  lessonForm: FormGroup;
  isOpenLessons:boolean = false;

  constructor(private fb: FormBuilder, private lessonsService: LessonsService) { 
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
      courseId: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.lessonForm.valid) {
      console.log(this.lessonForm.value);
      this.lessonsService.createLesson(this.lessonForm.value.courseId,this.lessonForm.value.title,this.lessonForm.value.content).subscribe(
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
}
