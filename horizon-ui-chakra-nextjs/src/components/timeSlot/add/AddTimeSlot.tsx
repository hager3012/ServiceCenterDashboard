'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addTimeSlot, getTimeSlot } from "libs/endpoints/timeSlot";

const AddTimeSlot = () => {
    const [TimeSlot, setTimeSlot] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addTimeSlot(formData);
        router.push("/admin/timeSlot");
    }

    const fetchTimeSlots = async () => {
        let TimeSlots = await getTimeSlot();
        setTimeSlot(TimeSlots);
    }

    let fields: IFieldsProps = {
        title: "Add TimeSlot",
        disabled: false,
        fields: [
            {label: "Start Time", name: "startTime", inputType: "text", placeholder: "Time"},
            {label: "End Time", name: "endTime", inputType: "text", placeholder: "Time"},
            {label: "Day", name: "day", inputType: "text", placeholder: "Day"}
        ],
        heading: "Create TimeSlot",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchTimeSlots();
      
    },[]);

      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        heading={fields.heading}
        data={fields.data}
        dropDownLists={fields.dropDownLists}
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddTimeSlot;
