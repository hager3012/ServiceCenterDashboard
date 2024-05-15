export interface IRoomList {
    id: number,
    roomNumber: number,
    availability: boolean,
    centerName: string
}

export interface IRoom {
    roomNumber: number,
    availability: boolean,
    centerId: number
}