export interface Istudent {
    studentId: string
    studentName: string
    studentRole: string
    profileDescription: string
    profileImage: string
    skills: string[]
    semester: number
    isHosteller: boolean
    isActive: boolean
    address: Address
    isAddressSame: boolean
}

export interface Address {
    current: Current
    permanent: Permanent
}

export interface Current {
    city: string
    state: string
    country: string
    zipcode: string
}

export interface Permanent {
    city: string
    state: string
    country: string
    zipcode: string
}
export interface IstudentResp<T>{
    msg: string;
    data: T;
}