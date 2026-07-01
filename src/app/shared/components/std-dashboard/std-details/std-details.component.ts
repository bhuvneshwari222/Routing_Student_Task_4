import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Istudent } from 'src/app/shared/models/student';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-std-details',
  templateUrl: './std-details.component.html',
  styleUrls: ['./std-details.component.scss']
})
export class StdDetailsComponent implements OnInit {
  studentId !: string;
  studentObj !: Istudent;

  constructor(
    private _studentService: StudentsService,
    private _routes: ActivatedRoute,
    private _router: Router,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getStudentObj();
  }

  getStudentObj() {
    this._routes.params.subscribe(params => {
      this.studentId = params['stdID'];
      if (this.studentId) {
        this._studentService.fetchStudentById(this.studentId)
          .subscribe({
            next: resp => {
              this.studentObj = resp;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

}
