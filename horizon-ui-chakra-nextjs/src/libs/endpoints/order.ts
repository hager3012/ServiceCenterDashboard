
import { IItemList } from 'types/Item';
import { IInsertOrder, IOrderList } from 'types/Order';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/Order`;

/**
 * Retrieves a list of orders based on a status from the API.
 * @returns A promise resolving to an array of order objects.
 */
export async function GetOrder(status: string): Promise<IOrderList[]> {
  const data = await fetchApi<any>(`${Url}/${status}`, "GET");
  let orders = data.value;
  return orders;
}

/**
 * Adds a new Order to the database.
 * @param BodyData - The Order data to be added.
 * @returns A promise resolving to a success message upon successful addition.
 */
export async function AddOrder(BodyData: IInsertOrder): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Updates an existing Order's status.
 * @param BodyData - The new order status.
 * @param id - The ID of the order to be updated.
 * @returns A promise resolving to a success message upon successful update.
 */
export async function UpdateOrderStatus(status: string, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/orderId/${id}/status/${status}`, "PUT");
  return data.successMessage;
}

/**
 * Retrieves an Order's information by ID.
 * @param id - The ID of the Item to retrieve.
 * @returns A promise resolving to an Item object.
 */
export async function GetByIdOrder(id: string): Promise<IItemList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Item = data.value;
  return Item;
}