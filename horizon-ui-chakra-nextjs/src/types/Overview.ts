export interface IOverviewList
{  
	id: number;
    task: string,
    priority: string,
    status: string,
    dueDate: Date,
    salesName: string
}
export interface IOverview
{ 
    task: string,
    priority: string,
    status: string,
    dueDate: Date,
    salesId: string
}