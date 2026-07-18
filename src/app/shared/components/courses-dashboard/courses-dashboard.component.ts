import { Component, OnInit } from '@angular/core';
import { Icourse } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-dashboard',
  templateUrl: './courses-dashboard.component.html',
  styleUrls: ['./courses-dashboard.component.scss']
})
export class CoursesDashboardComponent implements OnInit {
  courseArr: Icourse[] = [];

  constructor(
    private _courseService: CoursesService,
    private _snackBar: SnackBarService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.courseArr = this._routes.snapshot.data['courses'];
    this._router.navigate(['courses', this.courseArr[0].courseId], {
      queryParams: {
        courseType: this.courseArr[0].courseType
      }
    })
  }

  ngOnInit(): void {
    // this.getCourseArr();
  }

  getCourseArr() {
    this._courseService.fetchCourses()
      .subscribe({
        next: resp => {
          this.courseArr = resp;
          this._router.navigate(['courses', this.courseArr[0].courseId], {
            queryParams: {
              courseType: this.courseArr[0].courseType
            }
          })
        },
        error: err => {
          this._snackBar.openSnackBar(err);
        }
      })
  }

}
