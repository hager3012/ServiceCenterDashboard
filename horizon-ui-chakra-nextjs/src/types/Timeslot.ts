export interface ITimeslot { 
    startTime: string;
    endTime: string;
    day:string
}
export interface ITimeslotList extends ITimeslot {  
    id: number 
}