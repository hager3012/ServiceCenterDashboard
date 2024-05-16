
export interface IServicePackage{
    packageName: string,
    packageDescription: string,
    packagePrice: number,
    serviceId: number
}

export interface IServicePackageList{
    id: number,
    packageName: string,
    packageDescription: string,
    packagePrice: number
}