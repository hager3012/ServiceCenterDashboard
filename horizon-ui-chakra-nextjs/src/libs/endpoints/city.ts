import { ICity, ICityList } from 'types/City';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/City`;

/**
 * retrieves a list of City from the api.
 * @returns a promise resolving to an array of City objects.
 */
export async function getCity(): Promise<ICityList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Citys = data.value;
  return Citys;
}
/**
 * deletes an City from the database by id.
 * @param id - the id of the City to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteCity(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an City's information by id.
 * @param id - the id of the City to retrieve.
 * @returns a promise resolving to an City object.
 */
export async function getByIdCity(id: string): Promise<ICityList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Citys = data.value;
  return Citys;
}
/**
 * updates an existing City's information.
 * @param BodyData - the updated City data.
 * @param id - the id of the City to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateCity(BodyData: ICity, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new City to the database.
 * @param BodyData - the City data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addCity(BodyData: ICity): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}