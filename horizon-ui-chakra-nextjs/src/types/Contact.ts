export interface IContactList
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
export interface IContact
{ 
    contactFirstName: string,
    contactLastName: string,
    contactEmail: string,
    gender: string,
    address: Address
}
export interface Address
{
    city: string,
    country: string,
	postalCode: string,
}

export enum Status
{
Lead , 
Oppurtienty,
Cancelled,
Customer
}
