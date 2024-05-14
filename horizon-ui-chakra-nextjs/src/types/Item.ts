import { ICategoryList } from "./ItemCategory";

export interface IItem{
	name: string;
	description: string;
	stock: number;
	price: number;      
}
export interface IUpdateItem extends IItem {
    categoryId: number
}
export interface IItemList extends IItem {
    id: number,
    category: ICategoryList
}

