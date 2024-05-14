import { ITimeslot, ITimeslotList } from 'types/Timeslot';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/TimeSlot`;

/**
 * retrieves a list of Timeslot from the api.
 * @returns a promise resolving to an array of Timeslot objects.
 */
export async function getTimeslot(): Promise<ITimeslotList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Timeslots = data.value;
  return Timeslots;
}
/**
 * deletes an Timeslot from the database by id.
 * @param id - the id of the Timeslot to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteTimeslot(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Timeslot's information by id.
 * @param id - the id of the Timeslot to retrieve.
 * @returns a promise resolving to an Timeslot object.
 */
export async function getByIdTimeslot(id: string): Promise<ITimeslotList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Timeslots = data.value;
  return Timeslots;
}
/**
 * updates an existing Timeslot's information.
 * @param BodyData - the updated Timeslot data.
 * @param id - the id of the Timeslot to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateTimeslot(BodyData: ITimeslot, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Timeslot to the database.
 * @param BodyData - the Timeslot data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addTimeslot(BodyData: ITimeslot): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}