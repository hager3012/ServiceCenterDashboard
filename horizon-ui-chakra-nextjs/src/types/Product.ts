export interface IProductList
{  
	id: number;
    productName: string,
    productDescription: string,
    productPrice: string,
    categoryName: string,
    productBrandName: string
}
export interface IProduct
{ 
    productName: string,
    productDescription: string,
    productPrice: string,
    productCategoryId: number,
    productBrandId: number
}