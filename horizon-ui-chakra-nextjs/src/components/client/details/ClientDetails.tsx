'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IClient } from 'types/Client';
import { getClientById  } from 'libs/endpoints/client';

const ClientDetails = ({ id }: { id: string }) => {
  const [client, setClient] = useState<IClient>();

  const router = useRouter();

  const fetchClient = async () => {
    setClient(await getClientById(id));
  };

  useEffect(() => {
    fetchClient();
}, [])

  const handleSubmit = async (formData: IClient) => {
    router.push('/admin/client');
  };

  let fields: IFieldsProps = {
    title: 'Client Details',
    disabled: true,
    fields: [
      { label: 'Id ', name: 'id', inputType: 'text', placeholder: 'id' },
      {
        label: 'Client Email',
        name: 'email',
        inputType: 'email',
        placeholder: 'Client Email',
      },
      {
        label: 'Client  Name',
        name: 'name',
        inputType: 'text',
        placeholder: 'Client Name',
      },
      {
        label: 'Client Phone Number',
        name: 'phone',
        inputType: 'text',
        placeholder: 'Client Phone Number',
      },
      {
        label: 'UserName',
        name: 'userName',
        inputType: 'text',
        placeholder: 'UserName',
      }

    ],
    heading: 'Back to Clients',
    data: client,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchClient();
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




export default ClientDetails;