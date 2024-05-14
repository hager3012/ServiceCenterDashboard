'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addCity, getCity } from "libs/endpoints/City";

const AddCity = () => {
    const [City, setCity] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addCity(formData);
        router.push("/admin/city");
    }

    const fetchCitys = async () => {
        let Citys = await getCity();
        setCity(Citys);
    }

    let fields: IFieldsProps = {
        title: "Add City",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Image", name: "image", inputType: "text", placeholder: "Image"},
        ],
        heading: "Create City",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchCitys();
      
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

export default AddCity;
