
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IAppointment, IAppointmentList } from 'types/Appointment';
import { getByIdAppointment, updateAppointment } from 'libs/endpoints/appointment';

const AppointmentUpdateForm = ({ id }: { id: string }) => {
  const [Appointment, setAppointment] = useState<IAppointmentList>();

  const router = useRouter();

  const fetchAppointment = async () => {
    setAppointment(await getByIdAppointment(id));
  };

  

  useEffect(() => {
    fetchAppointment();
}, [])

  const handleSubmit = async (formData: IAppointment) => {
    await updateAppointment(formData, id);
    router.push('/admin/appointment');
  };

  let fields: IFieldsProps = {
    title: 'Update Appointment ',
    disabled: false,
    fields: [
        {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Start Time"},
        {label: "End Time ", name: "endTime", inputType: "text", placeholder: " End Time"},
        {label:"Date",name:"date",inputType:"date",placeholder:"Date"},
        {label:"Doctor Name",name:"doctorName",inputType:"text",placeholder:"DoctorName"},
        {label:"Patient Name",name:"patientName",inputType:"text",placeholder:"PatientName"}
    ],
   
    heading: 'Update Appointment',
    data: Appointment,
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

export default AppointmentUpdateForm;