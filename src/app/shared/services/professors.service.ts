import { Injectable } from '@angular/core';
import { IProfessor, IProfessorResp } from '../models/professor';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  professorsArr: IProfessor[] = [
    {
      professorId: "PRO102",
      professorName: "Dr. Sneha Kulkarni",
      designation: "Associate Professor",
      department: "Information Technology",
      qualification: "Ph.D.",
      experienceYears: "11 to 15 Years",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fVfwXiOjr6c7MC_mrrTsoCMfsUqHQ4AtHNN5suAzOw&s=10",
      biography:
        "Expert in Artificial Intelligence and Machine Learning.",
      isTenured: true,
      isActive: true
    },
    {
      professorId: "PRO101",
      professorName: "Dr. Anil Mehta",
      designation: "Professor",
      department: "Computer Science",
      qualification: "Ph.D.",
      experienceYears: "16 to 20 Years",
      profileImage: "https://static.vecteezy.com/system/resources/thumbnails/060/766/513/small/a-cartoon-illustration-of-a-man-with-a-neat-hairstyle-beard-and-business-attire-png.png",
      biography:
        "Experienced professor specializing in Software Engineering and Web Technologies.",
      isTenured: true,
      isActive: true
    },
    {
      professorId: "PRO103",
      professorName: "Rahul Deshmukh",
      designation: "Assistant Professor",
      department: "Computer Science",
      qualification: "M.Tech",
      experienceYears: "6 to 10 Years",
      profileImage: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      biography:
        "Frontend developer turned academician with expertise in Angular and TypeScript.",
      isTenured: false,
      isActive: true
    }
  ];

  setFirstProfSelectedSub$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  fetchProfessors(): Observable<IProfessor[]> {
    return of(this.professorsArr);
  }

  fetchProfessorById(id: string): Observable<IProfessor> {
    let professor = this.professorsArr.find(s => s.professorId === id)!;
    return of(professor)
  }

  addProfessor(newProf: IProfessor): Observable<IProfessorResp<IProfessor>> {
    this.professorsArr.unshift(newProf);
    return of({
      msg: `Professor ${newProf.professorName} is added successfully!!!`,
      data: newProf
    });
  }

  removeProfessor(id: string): Observable<IProfessorResp<IProfessor>> {
    let getIndex = this.professorsArr.findIndex(s => s.professorId === id);
    let removedProf = this.professorsArr.splice(getIndex, 1);
    return of({
      msg: `Professor ${removedProf[0].professorName} with id ${id} is removed successfully!!!`,
      data: removedProf[0]
    })
  }

  updateProfessor(updatedProf: IProfessor): Observable<IProfessorResp<IProfessor>> {
    let getIndex = this.professorsArr.findIndex(s => s.professorId === updatedProf.professorId);
    this.professorsArr[getIndex] = updatedProf;
    return of({
      msg: `Professor ${updatedProf.professorName} with id ${updatedProf.professorId} is updated successfully!!!`,
      data: updatedProf
    })
  }
}
