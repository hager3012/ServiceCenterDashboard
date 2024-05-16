export interface IScheduleList
{  
	id: number;
    employeeName: string,
    startTime: string,
    endTime: string,
    day: string,
}

export interface ISchedule
{ 
    employeeId: string,
    timeSlotId: number,
}