import {Component, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/course';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input()
  courses: Course[] = [];

  @Output() editEmitter = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(
        value => {
          console.log(1);
          this.editEmitter.emit();
        }
      );
  }

}
