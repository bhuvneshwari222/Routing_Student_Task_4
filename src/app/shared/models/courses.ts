export interface Icourse {
    courseId: string;
    courseName: string;
    courseStatus: string;
    isCertificateAvailable: boolean;
    credits: number;
    duration: string;
    courseType: string;
    description: string;
    courseImage: string;
}
export interface IcourseResp<T>{
    msg: string;
    data: T;
}