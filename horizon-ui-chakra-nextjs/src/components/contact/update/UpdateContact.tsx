
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IContactList, Status } from 'types/Contact';
import { getByIdContact, updateContact } from 'libs/endpoints/contact';
import { enumToArray } from 'utils/enumUtils';

const ContactUpdateForm = ({ id }: { id: string }) => {
  const [contact, setContact] = useState<IContactList>();
  const router = useRouter();

  const fetchContact = async () => {
    setContact(await getByIdContact(id));
  };

  useEffect(() => {
    fetchContact();
}, [])

  const handleSubmit = async (status : Status) => {
    await updateContact(status,id)
    router.push('/admin/contact');
  };

  const statusOptions = enumToArray(Status);

  let fields: IFieldsProps = {
    title: 'Update Contact',
    disabled: false,
    fields: [
      { label: 'Contact Type', name: 'status', inputType: 'select', placeholder: 'Select Contact Type' , options: statusOptions},
    ],
    
    heading: 'Update Contact',
    onSubmit: handleSubmit,
  };

  return(
  <CompactForm
  title={fields.title}
  disabled={fields.disabled}
  fields={fields.fields}
  heading={fields.heading}
  onSubmit={handleSubmit}
></CompactForm>
  )
};

export default ContactUpdateForm;