import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProfessor } from 'src/app/shared/models/professor';
import { ProfessorsService } from 'src/app/shared/services/professors.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.scss']
})
export class ProfessorDetailsComponent implements OnInit {
  profId !: string;
  profObj !: IProfessor;

  constructor(
    private _profService: ProfessorsService,
    private _routes: ActivatedRoute,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getProfesor();
  }

  getProfesor() {
    this._routes.params.subscribe(params => {
      this.profId = params['profID'];
      if (this.profId) {
        this._profService.fetchProfessorById(this.profId)
          .subscribe({
            next: resp => {
              this.profObj = resp;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

}
