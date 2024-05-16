
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IContact, IContactList } from 'types/Contact';
import { getByIdContact, updateContact } from 'libs/endpoints/contact';
import { getCenter } from 'libs/endpoints/center';

const ContactUpdateForm = ({ id }: { id: string }) => {
  const [Contact, setContact] = useState<IContactList>();
  const [Center, setCenter] = useState([]);
  const router = useRouter();

  const fetchContact = async () => {
    setContact(await getByIdContact(id));
  };

  const fetchCenters = async () => {
    let Centers = await getCenter();
    setCenter(Centers);
    }
    
  useEffect(() => {
    fetchContact();
    fetchCenters();
}, [])

  const handleSubmit = async (formData: any) => {

    let contact: IContact = {
      contactFirstName: formData.contactName,
      contactLastName: formData.contactLastName,
      emailAddress: formData.emailAddress,
      address: {
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode
      }
  }

    await updateContact(contact, id);
    router.push('/admin/contact');
  };

  let fields: IFieldsProps = {
    title: 'Update Contact ',
    disabled: false,
    fields: [
      {label: "First Name", name: "contactFirstName", inputType: "text", placeholder: "First Name"},
      {label: "Last Name", name: "contactLastName", inputType: "text", placeholder: "Last Name"},
      {label: "Email Address", name: "emailAddress", inputType: "text", placeholder: "Email Address"},
      {label: "City", name: "city", inputType: "text", placeholder: "City"},
      {label: "country", name: "country", inputType: "text", placeholder: "country"},
      {label: "Postal Code", name: "postalCode", inputType: "text", placeholder: "Postal Code"}
    ],
    heading: 'Update Contact',
    data: Contact,
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownLists={fields.dropDownLists}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default ContactUpdateForm;