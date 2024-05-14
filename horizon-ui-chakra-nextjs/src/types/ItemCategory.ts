// import { IDepartmentList } from "./IDepartment";

export interface ICategory{
    categoryName: string,
    referenceNumber: string,
    inventoryId: number        
}
export interface ICategoryList extends ICategory {
    id: number
}

