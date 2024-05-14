'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addEvent, getEvent } from "libs/endpoints/event";
import { getProject } from "libs/endpoints/project";

const AddEvent = () => {
    const [Event, setEvent] = useState([]);
    const [Projects, setProjects] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addEvent(formData);
        router.push("/admin/event");
    }

    const fetchEvents = async () => {
        let Events = await getEvent();
        setEvent(Events);
    }

    const fetchProjects = async () => {
        let Project = await getProject();
        setProjects(Project);
    }

    let fields: IFieldsProps = {
        title: "Add Event",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
            {label: "Date", name: "date", inputType: "date", placeholder: "Event Date"},
            {label: "Location", name: "location", inputType: "text", placeholder: "Event Location Address"}
        ],
        dropDownLists: [
            {label: "Project Name", name: "projectId", displayName: "name", placeholder: "Project Name", value: "id", data: Projects},
        ],
        heading: "Create Event",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchEvents();
        fetchProjects();
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

export default AddEvent;
