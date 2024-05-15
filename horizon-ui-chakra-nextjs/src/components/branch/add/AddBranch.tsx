'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addBranch, getBranch } from "libs/endpoints/branch";
import { getCenter } from "libs/endpoints/center";
import { IBranch } from "types/Branch";

const AddBranch = () => {
    const [Center, setCenter] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {

        let branch: IBranch = {
            branchName: formData.branchName,
            emailAddress: formData.emailAddress,
            branchPhoneNumber: formData.branchPhoneNumber,
            address: {
                city: formData.city,
                country: formData.country,
                postalCode: formData.postalCode
            },
            centerId: formData.centerId
        }

        await addBranch(branch);
        router.push("/admin/branch");
    }

    const fetchCenters = async () => {
        let Centers = await getCenter();
        setCenter(Centers);
    }

    let fields: IFieldsProps = {
        title: "Add Branch",
        disabled: false,
        fields: [
            {label: "Name", name: "branchName", inputType: "text", placeholder: "Name"},
            {label: "Phone Number", name: "branchPhoneNumber", inputType: "text", placeholder: "Phone Number"},
            {label: "Email Address", name: "emailAddress", inputType: "text", placeholder: "Email Address"},
            {label: "City", name: "city", inputType: "text", placeholder: "City"},
            {label: "country", name: "country", inputType: "text", placeholder: "country"},
            {label: "Postal Code", name: "postalCode", inputType: "text", placeholder: "Postal Code"}
        ],
        dropDownLists: [
            {label: "Center", name: "centerId", placeholder: "Center", value: "id", displayName:"centerName", data: Center },
          ],
        heading: "Create Branch",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchCenters();
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

export default AddBranch;
