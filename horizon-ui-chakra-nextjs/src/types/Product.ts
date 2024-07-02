export interface IProductList
{  
	id: number;
    productName: string,
    productDescription: string,
    productPrice: number,
}
export interface IProduct
{ 
    productName: string,
    productDescription: string,
    productStock: number,
    productPrice: number,
    productCategoryId: number,
}
export interface IProductById extends IProductList
{
    productStock: number,
    categoryName: string,
    productCategoryId: number,
}