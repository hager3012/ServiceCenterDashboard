
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IPhaseList } from 'types/Phase';
import { useRouter } from 'next/navigation';
import { getByIdPhase } from 'libs/endpoints/phase';

const PhaseDetails = ({ id }: { id: string }) => {
  const [Phase, setPhase] = useState<IPhaseList>();
 
  const router = useRouter();

  const fetchPhase = async () => {
    setPhase(await getByIdPhase(id));
  };

 
  useEffect(() => {
    fetchPhase();
   }, [])

  const handleSubmit = async (formData: IPhaseList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Phase Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"}
    ],
    heading: 'Back to Phases',
    data: Phase,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchPhase();
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




export default PhaseDetails;
