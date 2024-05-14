'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addFloorPlan, getFloorPlan } from "libs/endpoints/floor-plan";
import { getProperty } from "libs/endpoints/property";

const AddFloorPlan = () => {
    const router = useRouter();
    const [Property, setProperty] = useState([]);
    const handleSubmit = async (formData: any) => {
        await addFloorPlan(formData);
        router.push("/admin/floor-plan");
    }

    const fetchPropertys = async () => {
        let Property = await getProperty();
        setProperty(Property);
        }

    let fields: IFieldsProps = {
        title: "Add FloorPlan",
        disabled: false,
        fields: [
            {label: "Image Url", name: "imageUrl", inputType: "text", placeholder: "Image Url"},
            {label: "Caption", name: "caption", inputType: "text", placeholder: "Caption"},
        ],
        dropDownLists: [
            {label: "Property Name", name: "propertyId", displayName: "name", placeholder: "Property Name", value: "id", data: Property},
        ],
        heading: "Create FloorPlan",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchPropertys();
        }, [])

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

export default AddFloorPlan;
