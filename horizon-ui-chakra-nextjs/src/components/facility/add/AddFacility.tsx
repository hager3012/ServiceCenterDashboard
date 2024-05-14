'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addFacility, getFacility } from "libs/endpoints/facility";

const AddFacility = () => {
    const [Facility, setFacility] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addFacility(formData);
        router.push("/admin/facility");
    }

    const fetchFacilitys = async () => {
        let Facilitys = await getFacility();
        setFacility(Facilitys);
    }

    let fields: IFieldsProps = {
        title: "Add Facility",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"}
        ],
        heading: "Create Facility",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchFacilitys();
      
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

export default AddFacility;
