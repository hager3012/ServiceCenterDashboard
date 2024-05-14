'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addOffer, getOffer } from "libs/endpoints/offer";
import { getUnit } from "libs/endpoints/unit";

const AddOffer = () => {
    const [Unit, setUnit] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addOffer(formData);
        router.push("/admin/offer");
    }

    const fetchUnits = async () => {
        let Units = await getUnit();
        setUnit(Units);
    }

    let fields: IFieldsProps = {
        title: "Add Offer",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
            {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
            {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
            {label: "Discount", name: "discount", inputType: "number", placeholder: "Discount"},
        ],
        dropDownLists: [
            {label: "Unit Number", name: "unitId", displayName: "unitNumber", placeholder: "Unit Number", value: "id", data: Unit},
        ],
        heading: "Create Offer",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchUnits();
      
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

export default AddOffer;
