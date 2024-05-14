import { IPaymentPlan, IPaymentPlanList } from 'types/PaymentPlan';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/PaymentPlane`;

/**
 * retrieves a list of PaymentPlan from the api.
 * @returns a promise resolving to an array of PaymentPlan objects.
 */
export async function getPaymentPlan(): Promise<IPaymentPlan[]> {
  const data = await fetchApi<any>(Url, "GET");
  let PaymentPlans = data.value;
  return PaymentPlans;
}
/**
 * deletes an PaymentPlan from the database by id.
 * @param id - the id of the PaymentPlan to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deletePaymentPlan(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an PaymentPlan's information by id.
 * @param id - the id of the PaymentPlan to retrieve.
 * @returns a promise resolving to an PaymentPlan object.
 */
export async function getByIdPaymentPlan(id: string): Promise<IPaymentPlanList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let PaymentPlans = data.value;
  return PaymentPlans;
}
/**
 * updates an existing PaymentPlan's information.
 * @param BodyData - the updated PaymentPlan data.
 * @param id - the id of the PaymentPlan to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updatePaymentPlan(BodyData: IPaymentPlan, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new PaymentPlan to the database.
 * @param BodyData - the PaymentPlan data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addPaymentPlan(BodyData: IPaymentPlan): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}