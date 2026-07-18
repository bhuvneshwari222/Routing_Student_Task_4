import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Istudent } from 'src/app/shared/models/student';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  studentForm !: FormGroup;
  isInEditMode: boolean = false;
  studentId !: string;
  studentObj !: Istudent;

  constructor(
    private _studentService: StudentsService,
    private _snackBar: SnackBarService,
    private _routes: ActivatedRoute,
    private _router: Router,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.isAddressSameHandler();
    this.currentAddressHandler();
    this.patchStudentDetails();
  }

  createForm() {
    this.studentForm = new FormGroup({
      studentName: new FormControl(null, Validators.required),
      studentRole: new FormControl(null, Validators.required),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),
      isActive: new FormControl(null, Validators.required),
      skills: new FormArray([]),
      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl('India'),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        }),
        permanent: new FormGroup({
          country: new FormControl('India'),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        })
      }),
      isAddressSame: new FormControl({ value: null, disabled: true })
    })
  }

  get f() {
    return this.studentForm.controls;
  }

  get currAddControls() {
    return (this.f['address'].get('current') as FormGroup).controls;
  }

  get perAddControls() {
    return (this.f['address'].get('permanent') as FormGroup).controls;
  }

  get skillsArr() {
    return this.f['skills'] as FormArray
  }

  addSkill() {
    let control = new FormControl(null, Validators.required);
    this.skillsArr.push(control);
  }

  removeSkill(i: number) {
    this.skillsArr.removeAt(i);
  }

  isAddressSameHandler() {
    this.f['address'].get('current')?.valueChanges.subscribe(val => {
      if (this.f['address'].get('current')?.valid) {
        this.f['isAddressSame'].enable();
      } else {
        this.f['isAddressSame'].disable();
        this.f['isAddressSame'].reset();
      }
    })
  }

  currentAddressHandler() {
    this.f['isAddressSame'].valueChanges.subscribe(val => {
      if (val) {
        let current = this.f['address'].get('current')?.value;
        this.f['address'].get('permanent')?.patchValue(current);
        this.f['address'].get('permanent')?.disable();
      } else if (this.isInEditMode && !val) {
        this.f['address'].get('permanent')?.patchValue(this.studentObj.address.permanent);
        this.f['address'].get('permanent')?.enable();
      } else {
        this.f['address'].get('permanent')?.reset();
        this.f['address'].get('permanent')?.enable();
      }
    })
  }

  onSubmit() {
    let newStudent: Istudent = { ...this.studentForm.getRawValue(), studentId: Date.now().toString() }
    this._studentService.addStudent(newStudent)
      .subscribe({
        next: resp => {
          this._snackBar.openSnackBar(resp.msg);
          this._studentService.setFirstStdSelectedSub$.next(true);
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  patchStudentDetails() {
    this.studentId = this._routes.snapshot.paramMap.get('stdID')!;
    this._studentService.fetchStudentById(this.studentId)
      .subscribe({
        next: resp => {
          this.isInEditMode = true;
          this.studentObj = resp;
          this._utility.patchFormArr(resp.skills, this.skillsArr)
          this.studentForm.patchValue(resp)
        },
        error: err => {
          this._snackBar.openSnackBar(err);
        }
      })
  }

  onUpdate() {
    if (this.studentForm.invalid) {
      return this.studentForm.markAllAsTouched();
    } else {
      let updatedStudent: Istudent = { ...this.studentForm.getRawValue(), studentId: this.studentId }
      this._studentService.updateStudent(updatedStudent)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.msg);
            this._router.navigate(['students', this.studentId], {
              queryParams: {
                studentRole: this.studentObj.studentRole
              }
            })
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

   canDeactivate(){
    if(this.studentForm.dirty && this.isInEditMode){
      let confirmation = confirm(`Are you sure, you want to discard this changes?`)
      return confirmation;
    }else{
      return true;
    }
  }
}
