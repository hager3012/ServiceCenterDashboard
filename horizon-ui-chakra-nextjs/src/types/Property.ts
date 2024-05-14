export interface IPropertyList
{  
	id: number;
    name: string,
    type: string,
    size: number,
    price: number,
    address: string
	
}
export interface IProperty
{ 
    name: string,
    type: string,
    size: number,
    price: number,
    address: string,
    projectId: number,
    paymentPlanId: number,
    facilitiesId: number[],
    images: PropertyImage[]
}
export interface PropertyImage {
    imageUrl: string,
    caption: string | null
}