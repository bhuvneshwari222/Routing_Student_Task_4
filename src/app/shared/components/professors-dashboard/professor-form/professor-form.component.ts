import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfessor } from 'src/app/shared/models/professor';
import { ProfessorsService } from 'src/app/shared/services/professors.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {
  profForm !: FormGroup;
  isInEditMode: boolean = false;
  profId !: string;
  profObj !: IProfessor;
  experienceYearsArr: string[] = [
    '0 to 2 Years',
    '3 to 5 Years',
    '6 to 10 Years',
    '11 to 15 Years',
    '16 to 20 Years',
    '20+ Years'
  ];
  designationArr: string[] = [
    'Assistant Professor',
    'Associate Professor',
    'Professor',
    'Head of Department',
    'Dean',
    'Guest Faculty',
    'Visiting Professor',
    'Lecturer'
  ];
  departmentArr: string[] = [
    'Computer Science',
    'Information Technology',
    'Artificial Intelligence',
    'Data Science',
    'Cyber Security',
    'Software Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  constructor(
    private _profService: ProfessorsService,
    private _snackBar: SnackBarService,
    private _routes: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createProfForm();
    this.patchProfDetails()
  }

  createProfForm() {
    this.profForm = new FormGroup({
      professorName: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      experienceYears: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),
      biography: new FormControl(null, Validators.required),
      isActive: new FormControl(true, Validators.required)
    })
  }

  get f() {
    return this.profForm.controls;
  }

  onSubmit() {
    if (this.profForm.invalid) {
      this.profForm.markAllAsTouched();
    } else {
      let newProf: IProfessor = { ...this.profForm.getRawValue(), professorId: Date.now().toString() }
      this._profService.addProfessor(newProf)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.msg);
            this.profForm.reset();
            this._profService.setFirstProfSelectedSub$.next(true);
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

  patchProfDetails() {
    this.profId = this._routes.snapshot.paramMap.get('profID')!
    this._profService.fetchProfessorById(this.profId)
      .subscribe({
        next: resp => {
          this.profObj = resp;
          this.profForm.patchValue(resp);
          this.isInEditMode = true;
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }


  onUpdate() {
    if (this.profForm.invalid) {
      this.profForm.markAllAsTouched();
    } else {
      let updatedProf: IProfessor = { ...this.profForm.getRawValue(), professorId: this.profId }
      this._profService.updateProfessor(updatedProf)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.msg);
            this.profForm.reset();
            this._router.navigate(['professors', this.profId],{
              queryParams: {
                department: this.profObj.department
              }
            })
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

}
