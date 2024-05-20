
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  ISalesList } from 'types/Sales';
import { useRouter } from 'next/navigation';
import { getByIdSales } from 'libs/endpoints/sales';

const SalesDetails = ({ id }: { id: string }) => {
  const [Sales, setSales] = useState<ISalesList>();
 
  const router = useRouter();

  const fetchSales = async () => {
    setSales(await getByIdSales(id));
  };

 
  useEffect(() => {
    fetchSales();
   }, [])

  const handleSubmit = async (formData: ISalesList) => {
    router.push('/admin/sales');
  };

  let fields: IFieldsProps = {
    title: 'Sales Details',
    disabled: true,
    fields: [
        {label: "Sales First Name", name: "salesFirstName", inputType: "text", placeholder: "Sales First Name"},
        {label: "Sales last Name", name: "salesLastName", inputType: "text", placeholder: "Sales Last Name"},
        {label: "Sales Email", name: "salesEmail", inputType: "text", placeholder: "Sales Email"},
        {label: "Sales Phone Number", name: "salesPhoneNumber", inputType: "text", placeholder: "Sales Phone Number"},
        {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
      ],
    heading: 'Back to Saless',
    data: Sales,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchSales();
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




export default SalesDetails;
