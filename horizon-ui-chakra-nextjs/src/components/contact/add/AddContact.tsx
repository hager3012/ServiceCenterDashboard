'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addContact, getContact } from "libs/endpoints/contact";
import { City, Country, IContact } from "types/Contact";
import { enumToArray } from "utils/enumUtils";

const AddContact = () => {
    const router = useRouter();
    const handleSubmit = async (formData: any) => {

        let contact: IContact = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            email: formData.email,
            address: {
                city: formData.city,
                country: formData.country,
                postalCode: formData.postalCode
            },
            password : formData.password,
            phoneNumber : formData.phoneNumber,
            userName: formData.userName,
            dateOfBirth : formData.dateOfBirth
        }

        await addContact(contact);
        router.push("/admin/contact");
    }

    const cityOptions = enumToArray(City);
    const countryOptions = enumToArray(Country);

    let fields: IFieldsProps = {
        title: "Add Contact",
        disabled: false,
        fields: [
            {label: "First Name", name: "firstName", inputType: "text", placeholder: "First Name"},
            {label: "Last Name", name: "lastName", inputType: "text", placeholder: "Last Name"},
            {label: "Email Address", name: "email", inputType: "text", placeholder: "Email Address"},
            {label: "Password", name: "email", inputType: "text", placeholder: "Email Address"},
            {label: "UserName", name: "email", inputType: "text", placeholder: "Email Address"},
            {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
            {label: "City", name: "city", inputType: "select",  placeholder: "Select City", options: cityOptions  },
            {label: "country", name: "country", inputType: "select", placeholder: "Select Country" , options:countryOptions},
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
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddContact;
