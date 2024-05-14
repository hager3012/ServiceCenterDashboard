import { IAgent, IAgentList } from 'types/Agent';
import fetchApi from 'utils/baseFetch';
import {baseUrl}  from 'utils/header';

const Url = `${baseUrl}/Agent`;

/**
 * retrieves a list of agent from the API.
 * @returns a promise resolving to an array of agent objects.
 */
export async function getAgent(): Promise<IAgentList[]> {
  const data = await fetchApi<IAgentList>(Url, "GET");
  let agents = data.value;
  return agents;
}

/**
 * adds a new agent to the database.
 * @param BodyData - the agent data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addAgent(BodyData: IAgent): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * updates an existing agent's information.
 * @param BodyData - the updated agent data.
 * @param id - the iD of the agent to be updated.
 * @returns a promise resolving to a success message upon successful update.
 */
export async function updateAgent(BodyData: IAgent, id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "PUT", JSON.stringify(BodyData));
  return data.successMessage;
}

/**
 * retrieves an agent's information by iD.
 * @param id - the iD of the agent to retrieve.
 * @returns a promise resolving to an agent object.
 */
export async function getAgentById(id: string): Promise<IAgent> {
  const data = await fetchApi<any>(`${Url}/${id}`, "GET");
  let agent = data.value;
  return agent;
}

/**
 * deletes an agent from the database by ID.
 * @param id - the iD of the agent to delete.
 * @returns a promise resolving to a success message upon successful deletion.
 */
export async function deleteAgent(id: string): Promise<string> {
  const data = await fetchApi<any>(`${Url}/${id}`, "DELETE");
  return data.successMessage;
}