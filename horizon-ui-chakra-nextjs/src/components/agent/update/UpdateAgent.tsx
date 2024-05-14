"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { IClient } from "types/Client";
import { getClientById, updateClient } from "libs/endpoints/client";
const UpdateClient = ({ id }: { id: string }) => {
    const [Client, setClient] = useState<IClient>();
    const [message, setMessage] = useState<string>("");
    const router = useRouter();


    const handleSubmit = async (formData:any) => {
        setMessage(await updateClient(formData,id));
        router.push("/admin/client");
    }

    const fetchClient = async () => {
        const client = await getClientById(id)
        setClient(client);
    }
    useEffect(() => {
      
  }, [])
    let fields: IFieldsProps = {
      title:"Update Client",
      disabled: false,
      fields: [
        {label: "Client Email", name: "email", inputType: "text", placeholder: "Client Email"},
        {label: "Client Name", name: "name", inputType: "text", placeholder: "Client Name"},
        {label: "Client Phone Number", name: "phone", inputType: "text", placeholder: "Client Phone"},
        {label: "Client DOB", name: "dateOfBirth", inputType: "Date", placeholder: "Client DOB"},
        {label: "Client Gender", name: "gender", inputType: "text", placeholder: "Client Gender"},
        {label: "Budget", name: "budget", inputType: "text", placeholder: "Client Budget"},
        {label: "Preferences", name: "preferences", inputType: "text", placeholder: "Client Preferences"},
      ],
      data:Client,
      heading: "Update Client",
      onSubmit: handleSubmit,
    

    }
    useEffect(() => {
        fetchClient();
    }, []);
   
    
return (
  <CompactForm
  title={fields.title}
  fields={fields.fields} 
  heading={fields.heading}
  data={fields.data}
  onSubmit={handleSubmit}>
  </CompactForm>
)
}

export default UpdateClient;