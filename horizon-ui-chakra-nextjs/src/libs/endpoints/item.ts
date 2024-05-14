
import { IItem, IItemList, IUpdateItem } from 'types/Item';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/Item`;

/**
 * Retrieves a list of items from the API.
 * @returns A promise resolving to an array of category objects.
 */
export async function GetItem(): Promise<IItemList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let items = data.value;
  return items;
}

/**
 * Adds a new Item to the database.
 * @param BodyData - The Item data to be added.
 * @returns A promise resolving to a success message upon successful addition.
 */
export async function AddItem(BodyData: IUpdateItem): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Updates an existing Item's information.
 * @param BodyData - The updated Item data.
 * @param id - The ID of the Item to be updated.
 * @returns A promise resolving to a success message upon successful update.
 */
export async function UpdateItem(BodyData: IUpdateItem, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Retrieves a Item's information by ID.
 * @param id - The ID of the Item to retrieve.
 * @returns A promise resolving to an Item object.
 */
export async function GetByIdItem(id: string): Promise<IItemList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Item = data.value;
  return Item;
}

/**
 * Deletes a Item from the database by ID.
 * @param id - The ID of the Item to delete.
 * @returns A promise resolving to a success message upon successful deletion.
 */
export async function DeleteItem(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}