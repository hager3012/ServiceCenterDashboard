
import { IProjectCategory, IProjectCategoryList } from 'types/project-category';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/ProjectCategory`;

/**
 * retrieves a list of ProjectCategory from the api.
 * @returns a promise resolving to an array of Project Categories objects.
 */
export async function getProjectCategory(): Promise<IProjectCategoryList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let ProjectCategorys = data.value;
  return ProjectCategorys;
}
/**
 * deletes an Project Category from the database by id.
 * @param id - the id of the Project Category to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteProjectCategory(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Project Category's information by id.
 * @param id - the id of the Project Category to retrieve.
 * @returns a promise resolving to an ProjectCategory object.
 */
export async function getByIdProjectCategory(id: string): Promise<IProjectCategoryList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let ProjectCategorys = data.value;
  return ProjectCategorys;
}
/**
 * updates an existing Project Category's information.
 * @param BodyData - the updated Project Category data.
 * @param id - the id of the Project Category to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateProjectCategory(BodyData: IProjectCategory, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Project Category to the database.
 * @param BodyData - the Project Category data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addProjectCategory(BodyData: IProjectCategory): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}