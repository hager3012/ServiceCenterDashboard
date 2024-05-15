
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ICustomer, ICustomerList } from 'types/Customer';
import { getByIdCustomer, updateCustomer } from 'libs/endpoints/customer';
import { getBranch } from 'libs/endpoints/branch';

const CustomerUpdateForm = ({ id }: { id: string }) => {
  const [Customer, setCustomer] = useState<ICustomerList>();
  const [branch, setBranch] = useState([]);
  const router = useRouter();

  const fetchCustomer = async () => {
    setCustomer(await getByIdCustomer(id));
  };

  const fetchBranch = async () => {
    let branchs = await getBranch();
    setBranch(branchs);
  }

  useEffect(() => {
    fetchCustomer();
    fetchBranch();
}, [])

  const handleSubmit = async (formData: ICustomer) => {
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
    await updateCustomer(customer, id);
    router.push('/admin/customer');
  };

  let fields: IFieldsProps = {
    title: 'Update Customer ',
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
    heading: 'Update Customer',
    data: Customer,
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownLists={fields.dropDownLists}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default CustomerUpdateForm;