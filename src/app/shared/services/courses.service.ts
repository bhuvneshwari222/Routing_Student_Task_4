import { Injectable } from '@angular/core';
import { Icourse } from '../models/courses';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesArr: Icourse[] = [
    {
      courseId: "CRS101",
      courseName: "Angular Development",
      courseStatus: "Active",
      isCertificateAvailable: true,
      credits: 4,
      duration: "12 Weeks",
      courseType: "Online",
      description:
        "Learn Angular from fundamentals to advanced concepts including Routing, Reactive Forms, RxJS, and REST APIs.",
      courseImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      courseId: "CRS102",
      courseName: "Data Structures & Algorithms",
      courseStatus: "Active",
      isCertificateAvailable: true,
      credits: 5,
      duration: "16 Weeks",
      courseType: "Offline",
      description:
        "Master arrays, linked lists, trees, graphs, dynamic programming, and interview problem-solving.",
      courseImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
    },
    {
      courseId: "CRS103",
      courseName: "Database Management System",
      courseStatus: "Upcoming",
      isCertificateAvailable: false,
      credits: 3,
      duration: "10 Weeks",
      courseType: "Hybrid",
      description:
        "Understand relational databases, SQL, normalization, indexing, and transaction management.",
      courseImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      courseId: "CRS104",
      courseName: "Cloud Computing",
      courseStatus: "Completed",
      isCertificateAvailable: true,
      credits: 4,
      duration: "14 Weeks",
      courseType: "Online",
      description:
        "Explore AWS fundamentals, virtualization, cloud deployment models, and cloud security concepts.",
      courseImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    }
  ];

  constructor() { }

  fetchCourses(): Observable<Icourse[]> {
    return of(this.coursesArr);
  }

  fetchCourseById(id: string): Observable<Icourse> {
    let course = this.coursesArr.find(s => s.courseId === id)!;
    return of(course)
  }

}

