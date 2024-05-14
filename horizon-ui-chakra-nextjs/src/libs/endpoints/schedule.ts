
import { ISchedule, IScheduleList } from 'types/Schedule';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Schedule`;

/**
 * retrieves a list of schedule from the api.
 * @returns a promise resolving to an array of schedule objects.
 */
export async function getSchedule(): Promise<IScheduleList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let schedules = data.value;
  return schedules;
}
/**
 * deletes an schedule from the database by id.
 * @param id - the id of the schedule to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteSchedule(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an schedule's information by id.
 * @param id - the id of the schedule to retrieve.
 * @returns a promise resolving to an schedule object.
 */
export async function getByIdSchedule(id: string): Promise<IScheduleList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let schedules = data.value;
  return schedules;
}
/**
 * updates an existing schedule's information.
 * @param BodyData - the updated schedule data.
 * @param id - the id of the schedule to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateSchedule(BodyData: ISchedule, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new schedule to the database.
 * @param BodyData - the schedule data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addSchedule(BodyData: ISchedule): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}