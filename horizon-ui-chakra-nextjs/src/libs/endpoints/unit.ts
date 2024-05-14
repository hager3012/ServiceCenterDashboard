import { IUnit, IUnitList } from 'types/Unit';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Unit`;

/**
 * retrieves a list of Unit from the api.
 * @returns a promise resolving to an array of Unit objects.
 */
export async function getUnit(): Promise<IUnitList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Units = data.value;
  return Units;
}
/**
 * deletes an Unit from the database by id.
 * @param id - the id of the Unit to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteUnit(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Unit's information by id.
 * @param id - the id of the Unit to retrieve.
 * @returns a promise resolving to an Unit object.
 */
export async function getByIdUnit(id: string): Promise<IUnitList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Units = data.value;
  return Units;
}
/**
 * updates an existing Unit's information.
 * @param BodyData - the updated Unit data.
 * @param id - the id of the Unit to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateUnit(BodyData: IUnit, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Unit to the database.
 * @param BodyData - the Unit data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addUnit(BodyData: IUnit): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}