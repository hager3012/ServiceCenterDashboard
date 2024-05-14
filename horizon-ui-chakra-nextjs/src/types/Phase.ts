export interface IPhaseList
{  
	id: number;
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
}
export interface IPhase
{ 
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    projectId: number
}