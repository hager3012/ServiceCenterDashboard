import { IFacility, IFacilityList } from 'types/Facility';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Facility`;

/**
 * retrieves a list of Facility from the api.
 * @returns a promise resolving to an array of Facility objects.
 */
export async function getFacility(): Promise<IFacilityList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Facilitys = data.value;
  return Facilitys;
}
/**
 * deletes an Facility from the database by id.
 * @param id - the id of the Facility to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteFacility(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Facility's information by id.
 * @param id - the id of the Facility to retrieve.
 * @returns a promise resolving to an Facility object.
 */
export async function getByIdFacility(id: string): Promise<IFacilityList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Facilitys = data.value;
  return Facilitys;
}
/**
 * updates an existing Facility's information.
 * @param BodyData - the updated Facility data.
 * @param id - the id of the Facility to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateFacility(BodyData: IFacility, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Facility to the database.
 * @param BodyData - the Facility data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addFacility(BodyData: IFacility): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}