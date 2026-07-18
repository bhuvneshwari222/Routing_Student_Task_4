import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IProfessor } from 'src/app/shared/models/professor';
import { ProfessorsService } from 'src/app/shared/services/professors.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

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
    private _snackBar: SnackBarService,
    private _matDialog: MatDialog
  ) { 
    this._routes.data.subscribe(data =>{
      this.profObj = data['professor']
    })
  }

  ngOnInit(): void {
    // this.getProfesor();
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

  onRemove() {
    let config = new MatDialogConfig();
    config.data = `Are you sure you want to remove this professor?`;
    config.disableClose = true;
    config.width = '400px';
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config);
    matDialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._profService.removeProfessor(this.profId)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg);
                  this._profService.setFirstProfSelectedSub$.next(true);
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
