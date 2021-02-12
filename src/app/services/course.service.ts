import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Injectable} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map(res => res["payload"].sort(sortCoursesBySeqNo))
    );
  }

  saveCourse(courseId:string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
