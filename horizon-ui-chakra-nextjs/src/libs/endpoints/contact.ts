import { IContact, IContactList } from 'types/Contact';
import fetchApi from 'utils/baseFetch';
import { baseUrl } from 'utils/header';
const Url = `${baseUrl}/Contact`;

/**
 * retrieves a list of Contact from the api.
 * @returns a promise resolving to an array of Contact objects.
 */
export async function getContact(): Promise<IContactList[]> {
  const data = await fetchApi<any>(Url, "GET");
  let Contacts = data.value;
  return Contacts;
}


/**
 * adds a new Contact to the database.
 * @param BodyData - the Contact data to be added.
 * @returns a promise resolving to a success message upon successful addition.
 */
export async function addContact(BodyData: IContact): Promise<string> {
  const data = await fetchApi<any>(Url, "POST", JSON.stringify(BodyData));
  return data.successMessage;
}