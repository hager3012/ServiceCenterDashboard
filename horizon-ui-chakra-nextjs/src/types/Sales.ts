export interface ISales{
    salesEmail: string,
    salesFirstName: string,
    salesLastName: string,
    salesPhoneNumber:string,
    userName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    departmentId: number,
}

export interface ISalesList{
    id: string,
    salesEmail: string,
    salesFirstName: string,
    salesLastName: string,
    salesPhoneNumber:string,
    userName: string
}