import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Istudent } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-std-dashboard',
  templateUrl: './std-dashboard.component.html',
  styleUrls: ['./std-dashboard.component.scss']
})
export class StdDashboardComponent implements OnInit {
  StdArr: Istudent[] = [];

  constructor(
    private _stdService: StudentsService,
    private _snackBar: SnackBarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getStdArr();
    this._stdService.setFirstStdSelectedSub$.subscribe(resp => {
      if (resp) {
        this.setFirstItemSelected();
      }
    })
  }

  getStdArr() {
    this._stdService.fetchStudents()
      .subscribe({
        next: resp => {
          this.StdArr = resp;
          this.setFirstItemSelected();
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  setFirstItemSelected() {
    this._router.navigate(['students', this.StdArr[0].studentId], {
      queryParams: {
        studentRole: this.StdArr[0].studentRole
      }
    })
  }

}
