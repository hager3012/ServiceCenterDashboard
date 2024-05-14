'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IAgent } from 'types/Agent';
import { getAgentById  } from 'libs/endpoints/agent';

const AgentDetails = ({ id }: { id: string }) => {
  const [Agent, setAgent] = useState<IAgent>();

  const router = useRouter();

  const fetchAgent = async () => {
    setAgent(await getAgentById(id));
  };

  useEffect(() => {
    fetchAgent();
}, [])

  const handleSubmit = async (formData: IAgent) => {
    router.push('/admin/agent');
  };

  let fields: IFieldsProps = {
    title: 'Agent Details',
    disabled: true,
    fields: [
      { label: 'Id ', name: 'id', inputType: 'text', placeholder: 'id' },
      {
        label: 'Agent Email',
        name: 'email',
        inputType: 'email',
        placeholder: 'Agent Email',
      },
      {
        label: 'Frist Agent  Name',
        name: 'fristName',
        inputType: 'text',
        placeholder: 'Frist Agent  Name',
      },
      {
        label: 'Last Agent  Name',
        name: 'lastName',
        inputType: 'text',
        placeholder: 'Last Agent  Name',
      },
      {
        label: 'Agent Phone Number',
        name: 'phone',
        inputType: 'text',
        placeholder: 'Agent Phone Number',
      },
      {
        label: 'UserName',
        name: 'userName',
        inputType: 'text',
        placeholder: 'UserName',
      }

    ],
    heading: 'Back to Clients',
    data: Agent,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchAgent();
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




export default AgentDetails;