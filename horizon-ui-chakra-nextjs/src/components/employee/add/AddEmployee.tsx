'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addEmployee, getEmployee } from "libs/endpoints/employee";
import { GetDepartment } from "libs/endpoints/department";

const AddEmployee = () => {
    const [Employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState([]);
    const router = useRouter();

    const handleSubmit = async (formData: any) => {
        await addEmployee(formData);
        router.push("/admin/employee");
    }

    const fetchEmployees = async () => {
        let Employees = await getEmployee();
        setEmployee(Employees);
    }

    const fetchDepartment = async () => {
        let departments = await GetDepartment();
        setDepartment(departments);
      }

    let fields: IFieldsProps = {
        title: "Add Employee",
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
        heading: "Create Employee",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchEmployees();
        fetchDepartment();
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

export default AddEmployee;
