import { Component, OnInit } from '@angular/core';
import { IProfessor } from '../../models/professor';
import { ProfessorsService } from '../../services/professors.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professors-dashboard',
  templateUrl: './professors-dashboard.component.html',
  styleUrls: ['./professors-dashboard.component.scss']
})
export class ProfessorsDashboardComponent implements OnInit {
  profArr: IProfessor[] = [];

  constructor(
    private _profService: ProfessorsService,
    private _snackBar: SnackBarService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.profArr = this._route.snapshot.data['professors'];
    this.setFirstProfSelected();
   }

  ngOnInit(): void {
    // this.getProfArr();
    this._profService.setFirstProfSelectedSub$.subscribe(resp => {
      if (resp) {
        this.setFirstProfSelected();
      }
    })
  }

  getProfArr() {
    this._profService.fetchProfessors()
      .subscribe({
        next: resp => {
          this.profArr = resp;
          this.setFirstProfSelected();
        },
        error: err => {
          this._snackBar.openSnackBar(err);
        }
      })
  }

  setFirstProfSelected() {
    this._router.navigate(['professors', this.profArr[0].professorId], {
      queryParams: {
        department: this.profArr[0].department
      }
    })
  }

}
