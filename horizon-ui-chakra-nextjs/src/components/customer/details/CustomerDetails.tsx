
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  ICustomerList } from 'types/Customer';
import { useRouter } from 'next/navigation';
import { getByIdCustomer } from 'libs/endpoints/customer';

const CustomerDetails = ({ id }: { id: string }) => {
  const [Customer, setCustomer] = useState<ICustomerList>();
 
  const router = useRouter();

  const fetchCustomer = async () => {
    setCustomer(await getByIdCustomer(id));
  };

 
  useEffect(() => {
    fetchCustomer();
   }, [])

  const handleSubmit = async (formData: ICustomerList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Customer Details',
    disabled: true,
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
        {label: "Branch Name", name: "branchName", inputType: "text", placeholder: "Branch Name"}
      ],
    heading: 'Back to Customers',
    data: Customer,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};




export default CustomerDetails;
