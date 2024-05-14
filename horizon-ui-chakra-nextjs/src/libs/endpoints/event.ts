import { IEvent, IEventList } from 'types/Event';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Event`;

/**
 * retrieves a list of Event from the api.
 * @returns a promise resolving to an array of Event objects.
 */
export async function getEvent(): Promise<IEventList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Events = data.value;
  return Events;
}
/**
 * deletes an Event from the database by id.
 * @param id - the id of the Event to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteEvent(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Event's information by id.
 * @param id - the id of the Event to retrieve.
 * @returns a promise resolving to an Event object.
 */
export async function getByIdEvent(id: string): Promise<IEventList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Events = data.value;
  return Events;
}
/**
 * updates an existing Event's information.
 * @param BodyData - the updated Event data.
 * @param id - the id of the Event to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateEvent(BodyData: IEvent, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Event to the database.
 * @param BodyData - the Event data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addEvent(BodyData: IEvent): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}