'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IScheduleList } from 'types/Schedule';
import { getByIdSchedule, updateSchedule } from 'libs/endpoints/schedule';
import { getTimeSlot } from 'libs/endpoints/timeSlot';
import { getEmployee } from 'libs/endpoints/employee';

const ScheduleUpdateForm = ({ id }: { id: string }) => {
  const [Schedule, setSchedule] = useState<IScheduleList>();
  const [TimeSlot, setTimeslots] = useState([]);
  const [Employees, setEmployee] = useState([]);

  const router = useRouter();

  const fetchSchedule = async () => 
    setSchedule(await getByIdSchedule(id));
  
  const fetchTimeslots = async () => {
    let Timeslots = await getTimeSlot();
    setTimeslots(Timeslots);
  }

  const fetchEmployee = async () => {
    let employees = await getEmployee();
    setEmployee(employees);
  }

  useEffect(() => {
    fetchEmployee();
    fetchTimeslots();
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
    ],
    dropDownLists:[
        { label: "Employee", name: "employeeId", placeholder: "Employee", value: "id", displayName: "employeeFirstName", data: Employees},
        { label: "Time Slot Id", name: "timeSlotId", placeholder: "Time Slot Id",  value: "id", displayName: "startTime", data: TimeSlot},
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
      dropDownLists={fields.dropDownLists}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
    );
};

export default ScheduleUpdateForm;