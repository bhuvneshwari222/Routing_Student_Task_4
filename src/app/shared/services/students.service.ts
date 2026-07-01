import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Istudent, IstudentResp } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentsArr = [
    {
      studentId: "STD101",
      studentName: "Aarav Sharma",
      studentRole: "Regular",
      profileDescription:
        "Passionate Computer Science student with strong interest in Angular, TypeScript, and modern web development.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1IEwrscJvLui6QQ7dbcybkJLo5haSOnNE0W5ub29Yg&s=10",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Angular",
        "TypeScript"
      ],
      semester: 6,
      isHosteller: true,
      isActive: true,
      address: {
        current: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
          zipcode: "411001"
        },
        permanent: {
          city: "Nashik",
          state: "Maharashtra",
          country: "India",
          zipcode: "422001"
        }
      },
      isAddressSame: false
    },
    {
      studentId: "STD102",
      studentName: "Priya Patil",
      studentRole: "Scholarship",
      profileDescription:
        "Dedicated IT student with excellent academic performance and interest in UI/UX development.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeptp9XXymzwbswS_pYHg6QsgzPthcAyIdy8Dzzm0aNw&s=10",
      skills: [
        "Figma",
        "HTML",
        "CSS",
        "Bootstrap"
      ],
      semester: 4,
      isHosteller: false,
      isActive: true,
      address: {
        current: {
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          zipcode: "400001"
        },
        permanent: {
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          zipcode: "400001"
        }
      },
      isAddressSame: true
    },
    {
      studentId: "STD103",
      studentName: "Rohan Verma",
      studentRole: "Exchange",
      profileDescription:
        "Exchange student interested in cloud computing and full-stack web development.",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8TFJ7iUwyhF0_LOmPpst5aFLBQUYvRcuREn63JTVvg&s=10",
      skills: [
        "Java",
        "Spring Boot",
        "Angular",
        "SQL"
      ],
      semester: 5,
      isHosteller: true,
      isActive: false,
      address: {
        current: {
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          zipcode: "560001"
        },
        permanent: {
          city: "Delhi",
          state: "Delhi",
          country: "India",
          zipcode: "110001"
        }
      },
      isAddressSame: false
    }
  ];

  setFirstStdSelectedSub$ : Subject<boolean> = new Subject<boolean>();

  constructor() { }

  fetchStudents():Observable<Istudent[]>{
    return of(this.studentsArr);
  }

  fetchStudentById(id: string): Observable<Istudent>{
    let student = this.studentsArr.find(s => s.studentId === id)!;
    return of(student)
  }

  addStudent(newStd: Istudent): Observable<IstudentResp<Istudent>>{
    this.studentsArr.unshift(newStd);
    return of({
      msg: `The new Student ${newStd.studentName} is added successfully!!!`,
      data: newStd
    }); 
  }

  removeStudent(id: string):Observable<IstudentResp<Istudent>>{
    let getIndex = this.studentsArr.findIndex(s => s.studentId === id);
    let removedStd = this.studentsArr.splice(getIndex,1);
    return of({
      msg: `The student ${removedStd[0].studentName} with id ${id} is removed successfully!!!`,
      data: removedStd[0]
    })
  }

  updateStudent(updatedStd: Istudent):Observable<IstudentResp<Istudent>>{
    let getIndex = this.studentsArr.findIndex(s => s.studentId === updatedStd.studentId);
    this.studentsArr[getIndex] = updatedStd;
    return of({
      msg: `The student ${updatedStd.studentName} with id ${updatedStd.studentId} is updated successfully!!!`,
      data: updatedStd
    })
  }
}
