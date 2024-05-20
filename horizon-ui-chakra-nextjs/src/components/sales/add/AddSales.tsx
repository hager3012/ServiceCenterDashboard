'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addSales, getSales } from "libs/endpoints/sales";

const AddSales = () => {
    const router = useRouter();

    const handleSubmit = async (formData: any) => {
        await addSales(formData);
        router.push("/admin/sales");
    }

    let fields: IFieldsProps = {
        title: "Add Sales",
        disabled: false,
        fields: [
            {label: "Sales First Name", name: "salesFirstName", inputType: "text", placeholder: "Sales First Name"},
            {label: "Sales last Name", name: "salesLastName", inputType: "text", placeholder: "Sales Last Name"},
            {label: "Sales Email", name: "salesEmail", inputType: "text", placeholder: "Sales Email"},
            {label: "Sales Phone Number", name: "salesPhoneNumber", inputType: "text", placeholder: "Sales Phone Number"},
            {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
            {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
            {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
          ],
        heading: "Create Sales",
        onSubmit: handleSubmit,
       
      }

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

export default AddSales;
