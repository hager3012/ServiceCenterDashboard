import { IPhase, IPhaseList } from 'types/Phase';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Phase`;

/**
 * retrieves a list of Phase from the api.
 * @returns a promise resolving to an array of Phase objects.
 */
export async function getPhase(): Promise<IPhaseList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Phases = data.value;
  return Phases;
}
/**
 * deletes an Phase from the database by id.
 * @param id - the id of the Phase to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deletePhase(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Phase's information by id.
 * @param id - the id of the Phase to retrieve.
 * @returns a promise resolving to an Phase object.
 */
export async function getByIdPhase(id: string): Promise<IPhaseList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Phases = data.value;
  return Phases;
}
/**
 * updates an existing Phase's information.
 * @param BodyData - the updated Phase data.
 * @param id - the id of the Phase to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updatePhase(BodyData: IPhase, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Phase to the database.
 * @param BodyData - the Phase data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addPhase(BodyData: IPhase): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}