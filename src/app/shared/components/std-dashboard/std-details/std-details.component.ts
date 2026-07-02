import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Istudent } from 'src/app/shared/models/student';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

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
    private _snackBar: SnackBarService,
    private _matDialog: MatDialog,
    private _router: Router
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

  onRemove() {
    let config = new MatDialogConfig();
    config.data = `Are you sure you want to remove this student with id ${this.studentId}`;
    config.disableClose = true;
    config.width = '400px';
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config)
    matDialogRef.afterClosed().subscribe({
      next: resp => {
        if (resp) {
          this._studentService.removeStudent(this.studentId)
            .subscribe({
              next: resp => {
                this._snackBar.openSnackBar(resp.msg);
                this._router.navigate(['students'])
                this._studentService.setFirstStdSelectedSub$.next(true);
              },
              error: err => {
                this._snackBar.openSnackBar(err.msg);
              }
            })
        }
      }
    })
  }

}
