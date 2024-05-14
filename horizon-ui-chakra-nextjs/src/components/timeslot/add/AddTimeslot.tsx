'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addTimeslot, getTimeslot } from "libs/endpoints/timeslot";


const AddTimeslot = () => {
    const [Timeslot, setTimeslot] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addTimeslot(formData);
        router.push("/admin/timeslot");
    }

    const fetchTimeslots = async () => {
        let Timeslots = await getTimeslot();
        setTimeslot(Timeslots);
    }

    let fields: IFieldsProps = {
        title: "Add Timeslot",
        disabled: false,
        fields: [
            {label: "Start Time", name: "startTime", inputType: "time", placeholder: "Start Time" },
            {label: "End Time ", name: "endTime", inputType: "time", placeholder: " End Time" },
            {label:"Day",name:"day",inputType:"text",placeholder:"Day"}
        ],
        heading: "Create Timeslot",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchTimeslots();
      
    },[]);

      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        heading={fields.heading}
        data={fields.data}
        dropDownList={fields.dropDownList}
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddTimeslot;
