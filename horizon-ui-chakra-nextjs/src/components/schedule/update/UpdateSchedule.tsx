'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IScheduleList } from 'types/Schedule';
import { getByIdSchedule, updateSchedule } from 'libs/endpoints/schedule';
import { getTimeslot } from 'libs/endpoints/timeslot';

const ScheduleUpdateForm = ({ id }: { id: string }) => {
  const [Schedule, setSchedule] = useState<IScheduleList>();
  const [Timeslots, setTimeslots] = useState([]);

  const router = useRouter();

  const fetchSchedule = async () => 
    setSchedule(await getByIdSchedule(id));
  
  // const fetchTimeslots = async () => {
  //   let Timeslots = await getTimeslot();
  //   setTimeslots(Timeslots);
  // }

  useEffect(() => {
   // fetchTimeslots();
    fetchSchedule();
}, [])

  const handleSubmit = async (formData: IScheduleList) => {
    await updateSchedule(formData, id);
    router.push('/admin/schedule');
  };

  let fields: IFieldsProps = {
    title: 'Update Schedule ',
    disabled: false,
    fields: [
      { label: 'Agent Id', name: 'agentId', inputType: 'text', placeholder: 'Agent Id' },
      {label: "Timeslots", name: "timeSlotId", placeholder: "Timeslot",  inputType: 'number'},
      
    ],
    
    heading: 'Update Schedule',
    data: Schedule,
    onSubmit: handleSubmit,
  };

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

export default ScheduleUpdateForm;