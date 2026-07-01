export interface IProfessor {
    professorId: string;
    professorName: string;
    designation: string;
    department: string;
    qualification: string;
    experienceYears: string;
    profileImage: string;
    biography: string;
    isTenured: boolean;
    isActive: boolean;
}
export interface IProfessorResp<T>{
    msg: string;
    data: T;
}