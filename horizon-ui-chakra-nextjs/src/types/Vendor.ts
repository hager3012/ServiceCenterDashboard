export interface IVendor{
    vendorEmail: string,
    vendorFirstName: string,
    vendorLastName: string,
    vendorPhoneNumber:string,
    userName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    vendorType: string,
    contactPerson: string,
    contractStartDate: Date,
    contracEndDate: Date,
    centerId: number,
}

export interface IVendorList{
    id: string,
    vendorEmail: string,
    vendorFirstName: string,
    vendorLastName: string,
    vendorPhoneNumber:string,
    userName: string
    vendorType: string,
    contactPerson: string,
    contractStartDate: Date,
    contracEndDate: Date,
}