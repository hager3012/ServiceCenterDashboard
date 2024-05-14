import { IClient, IClientList } from 'types/Client';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/Client`;

/**
 * retrieves a list of client from the API.
 * @returns a promise resolving to an array of client objects.
 */
export async function getClient(): Promise<IClientList[]> {
  const data = await fetchApi<IClientList>(Url, "GET");
  let clients = data.value;
  return clients;
}

/**
 * adds a new client to the database.
 * @param BodyData - the client data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addClient(BodyData: IClient): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * updates an existing client's information.
 * @param BodyData - the updated client data.
 * @param id - the iD of the client to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateClient(BodyData: IClient, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * retrieves an client's information by iD.
 * @param id - the iD of the client to retrieve.
 * @returns a promise resolving to an client object.
 */
export async function getClientById(id: string): Promise<IClient> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let client = data.value;
  return client;
}

/**
 * deletes an client from the database by ID.
 * @param id - the iD of the client to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteClient(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}