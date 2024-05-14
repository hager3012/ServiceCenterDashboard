export interface IAppointmentList
{  
		id: number;
		startTime: string;
		endTime: string;
        date:Date;
	
}
export interface IAppointment
{ 
    scheduleId: number,
    clientId: string
}
