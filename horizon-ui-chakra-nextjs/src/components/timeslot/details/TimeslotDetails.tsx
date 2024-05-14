'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { ITimeslot, ITimeslotList } from 'types/Timeslot';
import { useRouter } from 'next/navigation';
import { getByIdTimeslot } from 'libs/endpoints/timeslot';

const TimeslotDetails = ({ id }: { id: string }) => {
  const [Timeslot, setTimeslot] = useState<ITimeslotList>();
 
  const router = useRouter();

  const fetchTimeslot = async () => {
    setTimeslot(await getByIdTimeslot(id));
  };

 
  useEffect(() => {
    fetchTimeslot();
   }, [])

  const handleSubmit = async (formData: ITimeslot) => {
    router.push('/admin/timeslot');
  };

  let fields: IFieldsProps = {
    title: 'Timeslot Details',
    disabled: true,
    fields: [
      { label: 'Id ', name: 'id', inputType: 'text', placeholder: 'id' }, 
      {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Start Time"},
      {label: "End Time ", name: "endTime", inputType: "text", placeholder: " End Time"},
      {label:"Day",name:"day",inputType:"text",placeholder:"Day"}
    
    ],
    heading: 'Back to Timeslots',
    data: Timeslot,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchTimeslot();
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




export default TimeslotDetails;
