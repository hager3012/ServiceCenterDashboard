import { IContact, IContactList } from 'types/Contact';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Contact`;

/**
 * retrieves a list of Contact from the api.
 * @returns a promise resolving to an array of Contact objects.
 */
export async function getContact(): Promise<IContactList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Contacts = data.value;
  return Contacts;
}
/**
 * deletes an Contact from the database by id.
 * @param id - the id of the Contact to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteContact(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}?id=${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Contact's information by id.
 * @param id - the id of the Contact to retrieve.
 * @returns a promise resolving to an Contact object.
 */
export async function getByIdContact(id: string): Promise<IContactList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Contacts = data.value;
  return Contacts;
}
/**
 * updates an existing Contact's information.
 * @param BodyData - the updated Contact data.
 * @param id - the id of the Contact to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateContact(BodyData: IContact, id: string, status: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/contactId/${id}/status/${status}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Contact to the database.
 * @param BodyData - the Contact data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addContact(BodyData: IContact): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}