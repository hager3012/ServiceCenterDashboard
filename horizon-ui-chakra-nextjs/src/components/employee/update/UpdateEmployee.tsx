
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IEmployee, IEmployeeList } from 'types/Employee';
import { getByIdEmployee, updateEmployee } from 'libs/endpoints/employee';
import { GetDepartment } from 'libs/endpoints/department';

const EmployeeUpdateForm = ({ id }: { id: string }) => {
  const [Employee, setEmployee] = useState<IEmployeeList>();
  const [department, setDepartment] = useState([]);
  const router = useRouter();

  const fetchEmployee = async () => {
    setEmployee(await getByIdEmployee(id));
  };

  const fetchDepartment = async () => {
    let departments = await GetDepartment();
    setDepartment(departments);
  }

  useEffect(() => {
    fetchEmployee();
    fetchDepartment();
}, [])

  const handleSubmit = async (formData: IEmployee) => {
    await updateEmployee(formData, id);
    router.push('/admin/employee');
  };

  let fields: IFieldsProps = {
    title: 'Update Employee ',
    disabled: false,
    fields: [
        {label: "Employee First Name", name: "employeeFirstName", inputType: "text", placeholder: "Employee First Name"},
        {label: "Employee last Name", name: "employeeLastName", inputType: "text", placeholder: "Employee Last Name"},
        {label: "Employee Email", name: "employeeEmail", inputType: "text", placeholder: "Employee Email"},
        {label: "Employee Phone Number", name: "employeePhoneNumber", inputType: "text", placeholder: "Employee Phone Number"},
        {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
      ],
      dropDownLists: [
        {label: "Department", name: "departmentId", placeholder: "Department", value: "id", displayName:"departmentName", data: department },
      ],
    heading: 'Update Employee',
    data: Employee,
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

export default EmployeeUpdateForm;