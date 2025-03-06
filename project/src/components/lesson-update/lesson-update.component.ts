import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  selector: 'app-lesson-update',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lesson-update.component.html',
  styleUrl: './lesson-update.component.css'
})
export class LessonUpdateComponent implements OnChanges{
  @Output() closeForm = new EventEmitter<any>();
  @Input() lesson: any | null = {};
  lessonForm: FormGroup;

  constructor(private fb: FormBuilder, private lessonsService: LessonsService) {
    this.lessonForm = this.fb.group({
      title: [this.lesson.title, [Validators.required, Validators.minLength(3)]],
      content: [this.lesson.content, [Validators.required]],
      courseId: [this.lesson.courseId, [Validators.required]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['lesson'] && this.lesson) {
      this.lessonForm.patchValue({
        title: this.lesson.title || '',
        content: this.lesson.content || '',
        courseId: this.lesson.courseId || ''
      });
    }
  }
  onSubmit(): void {
    if (this.lessonForm.invalid) {
      return;
    }
    const updatedLesson = { ...this.lesson, ...this.lessonForm.value };
    this.lessonsService.updateLesson(updatedLesson.courseId,updatedLesson.id,updatedLesson.title,updatedLesson.content)
      .subscribe({
        next: (response) => {
          this.closeForm.emit();  
        },
        error: (error) => {
          console.error('Error updating lesson', error);
        }
      });
  }
}

