
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IContactList } from 'types/Contact';
import { useRouter } from 'next/navigation';
import { getByIdContact } from 'libs/endpoints/contact';

const ContactDetails = ({ id }: { id: string }) => {
  const [Contact, setContact] = useState<IContactList>();
 
  const router = useRouter();

  const fetchContact = async () => {
    setContact(await getByIdContact(id));
  };

 
  useEffect(() => {
    fetchContact();
   }, [])

  const handleSubmit = async (formData: IContactList) => {
    router.push('/admin/contact');
  };

  let fields: IFieldsProps = {
    title: 'Contact Details',
    disabled: true,
    fields: [
      {label: "First Name", name: "contactFirstName", inputType: "text", placeholder: "First Name"},
      {label: "Last Name", name: "contactLastName", inputType: "text", placeholder: "Last Name"},
      {label: "Email Address", name: "emailAddress", inputType: "text", placeholder: "Email Address"},
      {label: "City", name: "city", inputType: "text", placeholder: "City"},
      {label: "country", name: "country", inputType: "text", placeholder: "country"},
      {label: "Postal Code", name: "postalCode", inputType: "text", placeholder: "Postal Code"}
    ],
    heading: 'Back to Contacts',
    data: Contact,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};




export default ContactDetails;
