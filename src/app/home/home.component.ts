import {Component, OnInit} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {CourseService} from '../services/course.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$;
  advancedCourses$;


  constructor(private service: CourseService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses = this.service.getAllCourses()
      .pipe(
        shareReplay()
      );

    this.beginnerCourses$ = courses.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );

    this.advancedCourses$ = courses.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    );
  }
}




