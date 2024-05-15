//import {ICustomer, ICustomerList}  from 'types/Customer';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/Customer`;

/**
 * Retrieves a list of customers from the API.
 * @returns A promise resolving to an array of category objects.
 */
export async function GetCustomer(): Promise<[]> {
  const data = await fetchApi<any>(Url, "GET");
  let customers = data.value;
  return customers;
}

/**
 * Adds a new Customer to the database.
 * @param BodyData - The Customer data to be added.
 * @returns A promise resolving to a success message upon successful addition.
 */
export async function AddCustomer(BodyData: any): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Updates an existing Customer's information.
 * @param BodyData - The updated Customer data.
 * @param id - The ID of the Customer to be updated.
 * @returns A promise resolving to a success message upon successful update.
 */
export async function UpdateCustomer(BodyData: ICustomer, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * Retrieves a Customer's information by ID.
 * @param id - The ID of the Customer to retrieve.
 * @returns A promise resolving to an Customer object.
 */
export async function GetByIdCustomer(id: string): Promise<> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let category = data.value;
  return category;
}

/**
 * Deletes a Customer from the database by ID.
 * @param id - The ID of the Customer to delete.
 * @returns A promise resolving to a success message upon successful deletion.
 */
export async function DeleteCustomer(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}?id=${id}`, "DELETE");
  return data.successMessage;
}