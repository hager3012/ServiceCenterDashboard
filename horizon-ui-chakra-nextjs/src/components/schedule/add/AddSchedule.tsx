'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addSchedule, getSchedule } from "libs/endpoints/schedule";


const AddSchedule = () => {
    const [Schedule, setSchedule] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addSchedule(formData);
        router.push("/admin/schedule");
    }

    const fetchSchedules = async () => {
        let Schedules = await getSchedule();
        setSchedule(Schedules);
    }

    let fields: IFieldsProps = {
        title: "Add Schedule",
        disabled: false,
        fields: [
            { label: 'Agent Id', name: 'agentId', inputType: 'text', placeholder: 'Agent Id' },
            {label: "Timeslot Id", name: "timeSlotId", placeholder: "Timeslot Id",  inputType: 'number'},
        ],
        heading: "Create Schedule",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchSchedules();
      
    },[]);

      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        heading={fields.heading}
        data={fields.data}
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddSchedule;
