import { IDeveloper, IDeveloperList } from 'types/Developer';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Developer`;

/**
 * retrieves a list of Developer from the api.
 * @returns a promise resolving to an array of Developer objects.
 */
export async function getDeveloper(): Promise<IDeveloperList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Developers = data.value;
  return Developers;
}
/**
 * deletes an Developer from the database by id.
 * @param id - the id of the Developer to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteDeveloper(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Developer's information by id.
 * @param id - the id of the Developer to retrieve.
 * @returns a promise resolving to an Developer object.
 */
export async function getByIdDeveloper(id: string): Promise<IDeveloperList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Developers = data.value;
  return Developers;
}
/**
 * updates an existing Developer's information.
 * @param BodyData - the updated Developer data.
 * @param id - the id of the Developer to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateDeveloper(BodyData: IDeveloper, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Developer to the database.
 * @param BodyData - the Developer data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addDeveloper(BodyData: IDeveloper): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}