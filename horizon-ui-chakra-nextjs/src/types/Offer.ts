export interface IOfferList
{  
	id: number;
    offerName: string,
    offerDescription: string,
    startDate: Date,
    endDate: Date,
    discount: number,
    productName: string
}
export interface IOffer
{ 
    offerName: string,
    offerDescription: string,
    startDate: Date,
    endDate: Date,
    discount: number,
    productId: number
}