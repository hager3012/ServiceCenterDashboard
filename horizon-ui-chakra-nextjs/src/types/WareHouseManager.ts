export interface IWareHouseManager{
    wareHouseManagerEmail: string,
    wareHouseManagerFirstName: string,
    wareHouseManagerLastName: string,
    wareHouseManagerPhoneNumber:string,
    userName: string,
    password: string,
    dateOfBirth: Date,
    gender: string,
    positionTitle: string,
    startDate: Date,
    endDate: Date,
    inventoryId: number,
}

export interface IWareHouseManagerList{
    id: string,
    wareHouseManagerEmail: string,
    wareHouseManagerFirstName: string,
    wareHouseManagerLastName: string,
    wareHouseManagerPhoneNumber:string,
    userName: string
    positionTitle: string,
    startDate: Date,
    endDate: Date,
}