
export interface IRatingService{
    ratingValue: number,
    serviceId: number,
    customerId: number
}

export interface IRatingServiceList{
    id: number,
    ratingValue: number,
    serviceName: string,
    customerName: string,
}