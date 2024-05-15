export interface ICustomer{
    customerEmail: string,
    customerFirstName: string,
    customerLastName: string,
    customerPhoneNumber:string,
    userName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    address: Address,
    branchId: number,
}

export interface ICustomerList{
    id: string,
    customerEmail: string,
    customerFirstName: string,
    customerLastName: string,
    customerPhoneNumber:string,
    branchName: string,
    userName: string,
    city: string,
    country: string,
	postalCode: string,
}

export interface Address
{
    city: string,
    country: string,
	postalCode: string,
}