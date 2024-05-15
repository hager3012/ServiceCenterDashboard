
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IEmployeeList } from 'types/Employee';
import { useRouter } from 'next/navigation';
import { getByIdEmployee } from 'libs/endpoints/employee';

const EmployeeDetails = ({ id }: { id: string }) => {
  const [Employee, setEmployee] = useState<IEmployeeList>();
 
  const router = useRouter();

  const fetchEmployee = async () => {
    setEmployee(await getByIdEmployee(id));
  };

 
  useEffect(() => {
    fetchEmployee();
   }, [])

  const handleSubmit = async (formData: IEmployeeList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Employee Details',
    disabled: true,
    fields: [
        {label: "Employee First Name", name: "employeeFirstName", inputType: "text", placeholder: "Employee First Name"},
        {label: "Employee last Name", name: "employeeLastName", inputType: "text", placeholder: "Employee Last Name"},
        {label: "Employee Email", name: "employeeEmail", inputType: "text", placeholder: "Employee Email"},
        {label: "Employee Phone Number", name: "employeePhoneNumber", inputType: "text", placeholder: "Employee Phone Number"},
        {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
      ],
    heading: 'Back to Employees',
    data: Employee,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchEmployee();
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




export default EmployeeDetails;
