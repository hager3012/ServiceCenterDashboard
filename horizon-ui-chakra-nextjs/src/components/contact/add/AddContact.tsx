'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addContact, getContact } from "libs/endpoints/contact";
import { getCenter } from "libs/endpoints/center";
import { IContact } from "types/Contact";

const AddContact = () => {
    const router = useRouter();
    const handleSubmit = async (formData: any) => {

        let contact: IContact = {
            contactFirstName: formData.contactFirstName,
            contactLastName: formData.contactLastName,
            gender: formData.gender,
            contactEmail: formData.contactEmail,
            address: {
                city: formData.city,
                country: formData.country,
                postalCode: formData.postalCode
            }
        }

        await addContact(contact);
        router.push("/admin/contact");
    }

    let fields: IFieldsProps = {
        title: "Add Contact",
        disabled: false,
        fields: [
            {label: "First Name", name: "contactFirstName", inputType: "text", placeholder: "First Name"},
            {label: "Last Name", name: "contactLastName", inputType: "text", placeholder: "Last Name"},
            {label: "Email Address", name: "contactEmail", inputType: "text", placeholder: "Email Address"},
            {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
            {label: "City", name: "city", inputType: "text", placeholder: "City"},
            {label: "country", name: "country", inputType: "text", placeholder: "country"},
            {label: "Postal Code", name: "postalCode", inputType: "text", placeholder: "Postal Code"}
        ],
        heading: "Create Contact",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
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

export default AddContact;
