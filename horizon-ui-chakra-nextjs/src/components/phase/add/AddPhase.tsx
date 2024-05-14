'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addPhase, getPhase } from "libs/endpoints/phase";
import { getProject } from "libs/endpoints/project";

const AddPhase = () => {
    const [Phase, setPhase] = useState([]);
    const [Projects, setProjects] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addPhase(formData);
        router.push("/admin/phase");
    }

    const fetchPhases = async () => {
        let Phases = await getPhase();
        setPhase(Phases);
    }

    const fetchProjects = async () => {
        let Project = await getProject();
        setProjects(Project);
    }

    let fields: IFieldsProps = {
        title: "Add Phase",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
            {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
            {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"}
        ],
        dropDownLists: [
            {label: "Project Name", name: "projectId", displayName: "name", placeholder: "Project Name", value: "id", data: Projects},
        ],
        heading: "Create Phase",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchPhases();
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

export default AddPhase;
