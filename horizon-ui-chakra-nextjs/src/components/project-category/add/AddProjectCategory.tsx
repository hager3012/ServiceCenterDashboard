'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addProjectCategory, getProjectCategory } from "libs/endpoints/project-category";

const AddProjectCategory = () => {
    const [ProjectCategory, setProjectCategory] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addProjectCategory(formData);
        router.push("/admin/project-category");
    }

    const fetchProjectCategorys = async () => {
        let ProjectCategorys = await getProjectCategory();
        setProjectCategory(ProjectCategorys);
    }


    let fields: IFieldsProps = {
        title: "Add ProjectCategory",
        disabled: false,
        fields: [
            {label: "Name", name: "Name", inputType: "text", placeholder: "Name"},
        ],
        heading: "Create Project Category",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchProjectCategorys();
        
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

export default AddProjectCategory;