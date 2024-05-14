'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addDeveloper, getDeveloper } from "libs/endpoints/developer";

const AddDeveloper = () => {
    const [Developer, setDeveloper] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addDeveloper(formData);
        router.push("/admin/developer");
    }

    const fetchDevelopers = async () => {
        let Developers = await getDeveloper();
        setDeveloper(Developers);
    }

    let fields: IFieldsProps = {
        title: "Add Developer",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
            {label: "Logo Url", name: "logoUrl", inputType: "text", placeholder: "LogoUrl"},
            {label: "Established Date", name: "estqblishedDate", inputType: "date", placeholder: "EstablishedDate"}
        ],
        heading: "Create Developer",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchDevelopers();
      
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

export default AddDeveloper;
