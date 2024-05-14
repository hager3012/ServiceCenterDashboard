
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IAppointmentList } from 'types/Appointment';
import { useRouter } from 'next/navigation';
import { getByIdAppointment } from 'libs/endpoints/appointment';

const appointmentDetails = ({ id }: { id: string }) => {
  const [appointment, setappointment] = useState<IAppointmentList>();
 
  const router = useRouter();

  const fetchappointment = async () => {
    setappointment(await getByIdAppointment(id));
  };

 
  useEffect(() => {
    fetchappointment();
   }, [])

  const handleSubmit = async (formData: IAppointmentList) => {
    router.push('/admin/appointment');
  };

  let fields: IFieldsProps = {
    title: 'Appointment Details',
    disabled: true,
    fields: [
        {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Start Time"},
        {label: "End Time ", name: "endTime", inputType: "text", placeholder: " End Time"},
        {label:"Date",name:"date",inputType:"date",placeholder:"Date"},
        {label: "Patient Name ", name: "patientName", inputType: "text", placeholder: " Patient Name"},
        {label: "Doctor Name ", name: "doctorName", inputType: "text", placeholder: "Doctor Name "}
    ],
    heading: 'Back to Appointments',
    data: appointment,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchappointment();
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




export default appointmentDetails;
