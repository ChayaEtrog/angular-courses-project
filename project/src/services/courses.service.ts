import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(courses => this.coursesSubject.next(courses)) 
    );
  }

  getCourseDetails(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }

  createCourse( title: string, description: string, teacherId: number ): Observable<any> {
    const courseData = { 
      title:title,
      description:description,
      teacherId: teacherId,
    }; 
    return this.http.post(this.apiUrl, courseData).pipe(
      tap(() => this.refreshCourses()) 
    );
  }

  updateCourse(courseId: number, courseData: { title: string, description: string, teacherId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData).pipe(
      tap(() => this.refreshCourses()) 
    );
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`).pipe(
      tap(() => this.refreshCourses()) 
    );
  }

  private refreshCourses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(courses => {
      this.coursesSubject.next(courses); 
    });
  }

  enrollStudent(courseId: number, userId: number): Observable<any> {
    const body = {
      userId: userId
    };

    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, body);
  }

  unenrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
      body: { userId }, // שליחת ה-userId בגוף הבקשה
    });
  }
  getCoursesByStudentId(studentId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/student/${studentId}`);
  }
}

