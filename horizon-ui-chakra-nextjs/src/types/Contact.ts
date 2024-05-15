export interface IBranchList
{  
	id: number;
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    city: string,
    country: string,
	postalCode: string,
    status: string
}
export interface IBranch
{ 
    contactFirstName: string,
    contactLastName: string,
    emailAddress: string,
    address: Address
}
export interface Address
{
    city: string,
    country: string,
	postalCode: string,
}