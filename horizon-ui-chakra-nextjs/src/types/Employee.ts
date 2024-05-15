export interface IEmployee{
    employeeEmail: string,
    employeeFirstName: string,
    employeeLastName: string,
    employeePhoneNumber:string,
    userName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    departmentId: number,
}

export interface IEmployeeList{
    id: string,
    employeeEmail: string,
    employeeFirstName: string,
    employeeLastName: string,
    employeePhoneNumber:string,
    userName: string
}