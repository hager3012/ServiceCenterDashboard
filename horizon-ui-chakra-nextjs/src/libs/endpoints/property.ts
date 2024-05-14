import { IProperty, IPropertyList } from 'types/Property';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Property`;

/**
 * retrieves a list of Property from the api.
 * @returns a promise resolving to an array of Property objects.
 */
export async function getProperty(): Promise<IPropertyList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Propertys = data.value;
  return Propertys;
}
/**
 * deletes an Property from the database by id.
 * @param id - the id of the Property to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteProperty(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Property's information by id.
 * @param id - the id of the Property to retrieve.
 * @returns a promise resolving to an Property object.
 */
export async function getByIdProperty(id: string): Promise<IPropertyList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Propertys = data.value;
  return Propertys;
}
/**
 * updates an existing Property's information.
 * @param BodyData - the updated Property data.
 * @param id - the id of the Property to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateProperty(BodyData: IProperty, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Property to the database.
 * @param BodyData - the Property data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addProperty(BodyData: IProperty): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}