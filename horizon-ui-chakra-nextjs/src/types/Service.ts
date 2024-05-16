
export interface IService{
    serviceName: string,
    serviceDescription: string,
    servicePrice: number,
    avaliable: string,
    serviceCategoryId: number,
    servicePcakagesIds: number,
    employeeId: string
}

export interface IServiceList{
    id: number,
    serviceName: string,
    serviceDescription: string,
    servicePrice: number,
    avaliable: string,
    serviceCategoryName: string,
    employeeName: string,
}