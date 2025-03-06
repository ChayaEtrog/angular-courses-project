import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private lessonApiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient) { }

  getLessonById(courseId: string): Observable<any> {
    return this.http.get(`${this.lessonApiUrl}/${courseId}/lessons`);
  }
  createLesson(courseId: number, title: string, content: string): Observable<any> {
    const lessonData = {
      title: title,
      content: content,
      courseId: courseId
    };
    return this.http.post(`${this.lessonApiUrl}/${courseId}/lessons`, lessonData);
  }

  updateLesson(courseId: number, lessonId: number, title: string, content: string): Observable<any> {
    const lessonData = {
      title: title,
      content: content,
      courseId: courseId
    };
    return this.http.put(`${this.lessonApiUrl}/${courseId}/lessons/${lessonId}`, lessonData);
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.lessonApiUrl}/${courseId}/lessons/${lessonId}`);
  }

  getLessons(courseId: string): Observable<any> {
    return this.http.get(`${this.lessonApiUrl}/${courseId}/lessons`);
  }
}
