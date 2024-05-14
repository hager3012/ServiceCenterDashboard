import { IFloorPlan, IFloorPlanList } from 'types/FloorPlan';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/FloorPlan`;

/**
 * retrieves a list of FloorPlan from the api.
 * @returns a promise resolving to an array of FloorPlan objects.
 */
export async function getFloorPlan(): Promise<IFloorPlanList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let FloorPlans = data.value;
  return FloorPlans;
}
/**
 * deletes an FloorPlan from the database by id.
 * @param id - the id of the FloorPlan to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteFloorPlan(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an FloorPlan's information by id.
 * @param id - the id of the FloorPlan to retrieve.
 * @returns a promise resolving to an FloorPlan object.
 */
export async function getByIdFloorPlan(id: string): Promise<IFloorPlanList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let FloorPlans = data.value;
  return FloorPlans;
}
/**
 * updates an existing FloorPlan's information.
 * @param BodyData - the updated FloorPlan data.
 * @param id - the id of the FloorPlan to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateFloorPlan(BodyData: IFloorPlan, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new FloorPlan to the database.
 * @param BodyData - the FloorPlan data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addFloorPlan(BodyData: IFloorPlan): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}