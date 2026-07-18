import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Icourse } from 'src/app/shared/models/courses';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseId !: string;
  courseObj !: Icourse;

  constructor(
    private _courseService: CoursesService,
    private _routes: ActivatedRoute,
    private _snackBar: SnackBarService
  ) {
    this._routes.data.subscribe(data =>{
      this.courseObj = data['course'];
    })
   }

  ngOnInit(): void {
    // this.getCourse()
  }

  getCourse() {
    this._routes.params.subscribe((params: Params) => {
      this.courseId = params['courseID'];
      if (this.courseId) {
        this._courseService.fetchCourseById(this.courseId)
          .subscribe({
            next: resp => {
              this.courseObj = resp;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

}
