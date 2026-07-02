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
        "Learn Angular from the ground up by building real-world web applications from scratch. Understand components, directives, pipes, services, dependency injection, routing, reactive forms, RxJS, and HTTP services in depth. Gain hands-on experience with Angular Material, state management, lazy loading, and REST API integration. Work on multiple mini-projects and a final capstone application to strengthen your practical skills. By the end of the course, you'll be confident in developing scalable, responsive, and production-ready single-page applications while following Angular best practices.",
      courseImage: "https://ict-trainings.com/storage/app/public/course/banner_5c88b1428edb1.jpg"
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
        "Build a strong foundation in data structures and algorithms through interactive lectures and coding exercises. Learn arrays, linked lists, stacks, queues, trees, graphs, heaps, hashing, recursion, greedy algorithms, and dynamic programming. Improve your logical thinking by solving real interview questions and competitive programming challenges. Analyze time and space complexity to write optimized solutions for different scenarios. This course is ideal for students preparing for coding interviews, placements, and software engineering roles.",
      courseImage: "https://s3.amazonaws.com/coursesity-blog/2020/07/data-structure-algorithm-courses.png"
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
        "Understand the core concepts of relational database management systems and their real-world applications. Learn SQL from beginner to advanced level, including joins, subqueries, views, stored procedures, and triggers. Explore normalization, indexing, transactions, concurrency control, and database security to design efficient systems. Work on practical database projects using industry-standard tools and datasets. By completing this course, you'll be able to create, manage, and optimize databases for modern web and enterprise applications.",
      courseImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbkzPfMB9ubf_Vzc2yN2mAEy7Pstk07sI-pWdMJhnM6ltoXcylNGv4BA&s=10"
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
        "Discover the fundamentals of cloud computing and modern infrastructure used by leading technology companies. Learn AWS services, virtualization, cloud deployment models, networking, storage solutions, identity management, and cloud security best practices. Understand how organizations migrate applications to the cloud while ensuring high availability and scalability. Gain practical experience by deploying applications, managing cloud resources, and monitoring cloud environments through hands-on projects. This course equips you with the knowledge required for entry-level cloud engineering and DevOps roles.",
      courseImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjjNpj4LEZ4FpzMLNog3_YvOe7N3Jn8gDPlL5z0wzCXbfZ3Jn4GdWnqVA1&s=10"
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

