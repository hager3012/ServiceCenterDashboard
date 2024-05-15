'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addCustomer, getCustomer } from "libs/endpoints/customer";
import { getBranch } from "libs/endpoints/branch";
import { ICustomer } from "types/Customer";

const AddCustomer = () => {
    const [Customer, setCustomer] = useState([]);
    const [branch, setBranch] = useState([]);
    const router = useRouter();

    const handleSubmit = async (formData: any) => {

      let customer: ICustomer = {
        customerEmail: formData.customerEmail,
        customerFirstName: formData.customerFirstName,
        customerLastName: formData.customerLastName,
        customerPhoneNumber: formData.customerPhoneNumber,
        userName: formData.userName,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
       
        address: {
            city: formData.city,
            country: formData.country,
            postalCode: formData.postalCode
        }, 
        branchId: formData.branchId,
      }
      await addCustomer(customer);
      router.push("/admin/customer");
    }

    const fetchCustomers = async () => {
        let Customers = await getCustomer();
        setCustomer(Customers);
    }

    const fetchBranch = async () => {
        let branchs = await getBranch();
        setBranch(branchs);
      }

    let fields: IFieldsProps = {
        title: "Add Customer",
        disabled: false,
        fields: [
            {label: "Customer First Name", name: "customerFirstName", inputType: "text", placeholder: "Customer First Name"},
            {label: "Customer last Name", name: "customerLastName", inputType: "text", placeholder: "Customer Last Name"},
            {label: "Customer Email", name: "customerEmail", inputType: "text", placeholder: "Customer Email"},
            {label: "Customer Phone Number", name: "customerPhoneNumber", inputType: "text", placeholder: "Customer Phone Number"},
            {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
            {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
            {label: "City", name: "city", inputType: "text", placeholder: "City"},
            {label: "country", name: "country", inputType: "text", placeholder: "country"},
            {label: "Postal Code", name: "postalCode", inputType: "text", placeholder: "Postal Code"},
            {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
          ],
          dropDownLists: [
            {label: "Branch", name: "branchId", placeholder: "Branch", value: "id", displayName:"branchName", data: branch },
          ],
        heading: "Create Customer",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchCustomers();
        fetchBranch();
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

export default AddCustomer;
