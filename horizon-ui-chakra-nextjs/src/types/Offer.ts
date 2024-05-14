export interface IOfferList
{  
	id: number;
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    discount: number
	
}
export interface IOffer
{ 
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    discount: number,
    unitId: number
}