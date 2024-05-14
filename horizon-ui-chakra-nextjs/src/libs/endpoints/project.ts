
import { IProject, IProjectList } from 'types/project';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Project`;

/**
 * retrieves a list of Project from the api.
 * @returns a promise resolving to an array of Project objects.
 */
export async function getProject(): Promise<IProjectList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Projects = data.value;
  return Projects;
}
/**
 * deletes an Project from the database by id.
 * @param id - the id of the Project to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteProject(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}
/**
 * retrieves an Project's information by id.
 * @param id - the id of the Project to retrieve.
 * @returns a promise resolving to an Project object.
 */
export async function getByIdProject(id: string): Promise<IProjectList> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let Projects = data.value;
  return Projects;
}
/**
 * updates an existing Project's information.
 * @param BodyData - the updated Project data.
 * @param id - the id of the Project to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateProject(BodyData: IProject, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}
/**
 * adds a new Project to the database.
 * @param BodyData - the Project data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addProject(BodyData: IProject): Promise<string> {
  console.log(JSON.stringify(BodyData));
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}