import {ICategory, ICategoryList}  from 'types/ItemCategory';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/ItemCategory`;

/**
 * Retrieves a list of categories from the API.
 * @returns A promise resolving to an array of category objects.
 */
export async function GetCategory(): Promise<ICategoryList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let categories = data.value;
  return categories;
}

/**
 * Adds a new Category to the database.
 * @param BodyData - The Category data to be added.
 * @returns A promise resolving to a success message upon successful addition.
 */
export async function AddCategory(BodyData: ICategory): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Updates an existing Category's information.
 * @param BodyData - The updated Category data.
 * @param id - The ID of the Category to be updated.
 * @returns A promise resolving to a success message upon successful update.
 */
export async function UpdateCategory(BodyData: ICategory, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Retrieves a Category's information by ID.
 * @param id - The ID of the Category to retrieve.
 * @returns A promise resolving to an Category object.
 */
export async function GetByIdCategory(id: string): Promise<ICategoryList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let category = data.value;
  return category;
}

/**
 * Deletes a Category from the database by ID.
 * @param id - The ID of the Category to delete.
 * @returns A promise resolving to a success message upon successful deletion.
 */
export async function DeleteCategory(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}

export async function GetInventories(): Promise<any> {
  const data = await fetchApi<any>(`${baseUrl}/Inventory`, "GET");
  return data.value;
}