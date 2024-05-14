'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ITimeslot, ITimeslotList } from 'types/Timeslot';
import { getByIdTimeslot, updateTimeslot } from 'libs/endpoints/timeslot';

const TimeslotUpdateForm = ({ id }: { id: string }) => {
  const [Timeslot, setTimeslot] = useState<ITimeslotList>();

  const router = useRouter();

  const fetchTimeslot = async () => {
    setTimeslot(await getByIdTimeslot(id));
  };

  

  useEffect(() => {
    fetchTimeslot();
}, [])

  const handleSubmit = async (formData: ITimeslot) => {
    await updateTimeslot(formData, id);
    router.push('/admin/timeslot');
  };

  let fields: IFieldsProps = {
    title: 'Update Timeslot ',
    disabled: false,
    fields: [
        {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Start Time"},
        {label: "End Time ", name: "endTime", inputType: "text", placeholder: " End Time"},
        {label:"Day",name:"day",inputType:"text",placeholder:"Day"}
    ],
   
    heading: 'Update Timeslot',
    data: Timeslot,
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownList={fields.dropDownList}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default TimeslotUpdateForm;