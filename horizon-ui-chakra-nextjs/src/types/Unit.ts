export interface IUnitList
{  
	id: number;
    unitNumber: number,
    floor: number,
    size: number,
    bedrooms: number,
    bathrooms: number,
    status: string
}
export interface IUnit
{ 
    unitNumber: number,
    floor: number,
    size: number,
    bedrooms: number,
    bathrooms: number,
    status: string,
    propertyId: number,
    paymentPlanId: number
}