import { IAppointment, IAppointmentList } from 'types/Appointment';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/appointment`;

/**
 * retrieves a list of appointment from the api.
 * @returns a promise resolving to an array of appointment objects.
 */
export async function getAppointment(): Promise<IAppointmentList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let appointments = data.value;
  return appointments;
}
/**
 * deletes an appointment from the database by id.
 * @param id - the id of the appointment to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteAppointment(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}?id=${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an appointment's information by id.
 * @param id - the id of the appointment to retrieve.
 * @returns a promise resolving to an appointment object.
 */
export async function getByIdAppointment(id: string): Promise<IAppointmentList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let appointments = data.value;
  return appointments;
}
/**
 * updates an existing appointment's information.
 * @param BodyData - the updated appointment data.
 * @param id - the id of the appointment to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateAppointment(BodyData: IAppointment, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new appointment to the database.
 * @param BodyData - the appointment data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addAppointment(BodyData: IAppointment): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}