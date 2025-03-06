import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LessonUpdateComponent } from '../lesson-update/lesson-update.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-show-lessons',
  standalone: true,
  imports: [MatChipsModule,
    MatIconModule,
    MatChipListbox,
    LessonUpdateComponent,
    MatButtonModule,
    ErrorMessageComponent
  ],
  templateUrl: './show-lessons.component.html',
  styleUrl: './show-lessons.component.css'
})
export class ShowLessonsComponent implements OnChanges {
  @Input() courseId: number = -1;
  errorMessage = '';
  lessons: any[] = [];
  currLesson: any = null;
  isWantUpdate: Boolean = false;

  constructor(private lessonsService: LessonsService, public authService:AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courseId'] && this.courseId !== -1) {
      this.fetchLessons();
    }
  }

  fetchLessons() {
    this.lessonsService.getLessonById(this.courseId.toString()).subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching lessons';
      }
    });
  }

  showDetails(lesson: any) {
    if (this.currLesson && this.currLesson == lesson)
      this.currLesson = null;
    else
      this.currLesson = lesson;
  }
  closeUpdateForm() {
    this.isWantUpdate = false;
    this.fetchLessons();
  }
  deleteLesson(courseId: number, lessonId: number) {
    this.lessonsService.deleteLesson(courseId, lessonId).subscribe(
      () => {
        this.fetchLessons();
        this.currLesson=null;
      },
      (error) => {
        this.errorMessage = "Error deleting course";
      }
    );
  }
}
