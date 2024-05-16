
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ITimeSlot, ITimeSlotList } from 'types/TimeSlot';
import { getByIdTimeSlot, updateTimeSlot } from 'libs/endpoints/timeSlot';

const TimeSlotUpdateForm = ({ id }: { id: string }) => {
  const [TimeSlot, setTimeSlot] = useState<ITimeSlotList>();

  const router = useRouter();

  const fetchTimeSlot = async () => {
    setTimeSlot(await getByIdTimeSlot(id));
  };

  

  useEffect(() => {
    fetchTimeSlot();
}, [])

  const handleSubmit = async (formData: ITimeSlot) => {
    await updateTimeSlot(formData, id);
    router.push('/admin/timeSlot');
  };

  let fields: IFieldsProps = {
    title: 'Update TimeSlot ',
    disabled: false,
    fields: [
      {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Time"},
      {label: "End Time", name: "endTime", inputType: "text", placeholder: "Time"},
      {label: "Day", name: "day", inputType: "text", placeholder: "Day"}
    ],
   
    heading: 'Update TimeSlot',
    data: TimeSlot,
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

export default TimeSlotUpdateForm;