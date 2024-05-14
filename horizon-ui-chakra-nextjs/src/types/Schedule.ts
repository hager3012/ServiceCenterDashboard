import { ITimeslot } from "./Timeslot";

export interface IScheduleList 
{
    id: number;
	agentName: string,
	startTime: string,
	endTime: string,
	day: string
}
export interface ISchedule extends ITimeslot
{
 	doctorId: string;
	 timeSlotId:number;
}