'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { getClient, addClient } from "libs/endpoints/client";

const AddClient = () => {

    const [client, setClient] = useState([]);

    const router = useRouter();


    const handleSubmit = async (formData: any) => {
        await addClient(formData);
        router.push("/admin/client");
    }

    const fetchClients = async () => {
        let clients = await getClient();
        setClient(clients);
    }
      useEffect(() => {
    }, [])
    
    let fields: IFieldsProps = {
        title: "Add Client",
        disabled: false,
        fields: [
            {label: "Client Email", name: "email", inputType: "text", placeholder: "Client Email"},
            {label: "Client Name", name: "name", inputType: "text", placeholder: "Client Name"},
            {label: "Client Phone Number", name: "phone", inputType: "text", placeholder: "Client Phone Name"},
            {label: "Client User Name", name: "userName", inputType: "text", placeholder: "Client User Name"},
            {label: "Client Password", name: "password", inputType: "text", placeholder: "Client Password"},
            {label: "Client DOB", name: "dateOfBirth", inputType: "Date", placeholder: "Client DOB"},
            {label: "Client Gender", name: "gender", inputType: "text", placeholder: "Client Gender"},
            {label: "Budget", name: "budget", inputType: "text", placeholder: "Client Budget"},
            {label: "Preferences", name: "preferences", inputType: "text", placeholder: "Client Preferences"},
        ],
        heading: "Create Client",
        onSubmit: handleSubmit,
        
      }

      useEffect(() => {
        fetchClients();
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

export default AddClient;