'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IScheduleList } from 'types/Schedule';
import { getByIdSchedule } from 'libs/endpoints/schedule';

const ScheduleDetails = ({ id }: { id: string }) => {
  const [Schedule, setSchedule] = useState<IScheduleList>();

  const router = useRouter();

  const fetchSchedule = async () => {
    setSchedule(await getByIdSchedule(id));
  };

  useEffect(() => {
    fetchSchedule();
}, [])

  const handleSubmit = async (formData: IScheduleList) => {
    router.push('/admin/schedule');
  };

  let fields: IFieldsProps = {
    title: 'Schedule Details',
    disabled: true,
    fields: [
        { label: 'Employee Name', name: 'employeeName', inputType: 'text', placeholder: 'Name' },
        { label: 'Start Time', name: 'startTime', inputType: 'text', placeholder: 'Start Time' },
        { label: 'End Time', name: 'endTime', inputType: 'text', placeholder: 'End Time' },
        { label: 'Day', name: 'day', inputType: 'text', placeholder: 'Day' },
    ],
    heading: 'Back to Schedules',
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

export default ScheduleDetails;