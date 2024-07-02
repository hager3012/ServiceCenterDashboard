'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addServiceCategory, getServiceCategory } from "libs/endpoints/service-category";

const AddServiceCategory = () => {
    const [ServiceCategory, setServiceCategory] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addServiceCategory(formData);
        router.push("/admin/service-category");
    }

    const fetchServiceCategorys = async () => {
        let ServiceCategorys = await getServiceCategory();
        setServiceCategory(ServiceCategorys);
    }

    let fields: IFieldsProps = {
        title: "Add ServiceCategory",
        disabled: false,
        fields: [
            {label: "Name", name: "serviceCategoryName", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "serviceCategoryDescription", inputType: "text", placeholder: "Description"}
        ],
        heading: "Create ServiceCategory",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchServiceCategorys();
      
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

export default AddServiceCategory;
