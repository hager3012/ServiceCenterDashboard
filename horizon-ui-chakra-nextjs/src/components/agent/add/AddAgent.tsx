'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { getAgent, addAgent } from "libs/endpoints/agent";

const AddAgent = () => {

    const [agent, setAgent] = useState([]);

    const router = useRouter();


    const handleSubmit = async (formData: any) => {
        await addAgent(formData);
        router.push("/admin/agent");
    }

    const fetchAgents = async () => {
        let Agents = await getAgent();
        setAgent(Agents);
    }
      useEffect(() => {
    }, [])
    
    let fields: IFieldsProps = {
        title: "Add Agent",
        disabled: false,
        fields: [
            {label: "Agent Email", name: "email", inputType: "text", placeholder: "Agent Email"},
            {label: "Frist Name", name: "fristName", inputType: "text", placeholder: "Frist Name"},
            {label: "Last Name", name: "lastName", inputType: "text", placeholder: "Last Name"},
            {label: "Agent Phone Number", name: "phone", inputType: "text", placeholder: "Agent Phone Name"},
            {label: "Agent User Name", name: "userName", inputType: "text", placeholder: "Agent User Name"},
            {label: "Agent Password", name: "password", inputType: "text", placeholder: "Agent Password"},
            {label: "Agent DOB", name: "dateOfBirth", inputType: "Date", placeholder: "Agent DOB"},
            {label: "Agent Gender", name: "gender", inputType: "text", placeholder: "Agent Gender"}
        ],
        heading: "Create Agent",
        onSubmit: handleSubmit,
        
      }

      useEffect(() => {
        fetchAgents();
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

export default AddAgent;