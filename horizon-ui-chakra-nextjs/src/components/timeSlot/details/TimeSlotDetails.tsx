
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  ITimeSlotList } from 'types/TimeSlot';
import { useRouter } from 'next/navigation';
import { getByIdTimeSlot } from 'libs/endpoints/timeSlot';

const TimeSlotDetails = ({ id }: { id: string }) => {
  const [TimeSlot, setTimeSlot] = useState<ITimeSlotList>();
 
  const router = useRouter();

  const fetchTimeSlot = async () => {
    setTimeSlot(await getByIdTimeSlot(id));
  };

 
  useEffect(() => {
    fetchTimeSlot();
   }, [])

  const handleSubmit = async (formData: ITimeSlotList) => {
    router.push('/admin/timeSlot');
  };

  let fields: IFieldsProps = {
    title: 'TimeSlot Details',
    disabled: true,
    fields: [
      {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Time"},
      {label: "End Time", name: "endTime", inputType: "text", placeholder: "Time"},
      {label: "Day", name: "day", inputType: "text", placeholder: "Day"}
    ],
    heading: 'Back to TimeSlots',
    data: TimeSlot,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchTimeSlot();
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




export default TimeSlotDetails;
