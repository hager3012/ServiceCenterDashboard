import { ISchedule, IScheduleList } from 'types/Schedule';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Schedule`;

/**
 * retrieves a list of Schedule from the api.
 * @returns a promise resolving to an array of Schedule objects.
 */
export async function getSchedule(): Promise<IScheduleList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Schedules = data.value;
  return Schedules;
}
/**
 * deletes an Schedule from the database by id.
 * @param id - the id of the Schedule to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteSchedule(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Schedule's information by id.
 * @param id - the id of the Schedule to retrieve.
 * @returns a promise resolving to an Schedule object.
 */
export async function getByIdSchedule(id: string): Promise<IScheduleList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Schedules = data.value;
  return Schedules;
}
/**
 * updates an existing Schedule's information.
 * @param BodyData - the updated Schedule data.
 * @param id - the id of the Schedule to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateSchedule(BodyData: ISchedule, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Schedule to the database.
 * @param BodyData - the Schedule data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addSchedule(BodyData: ISchedule): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}