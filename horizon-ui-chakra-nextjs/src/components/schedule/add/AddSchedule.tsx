'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addSchedule, getSchedule } from "libs/endpoints/schedule";
import { getEmployee } from "libs/endpoints/employee";
import { getTimeSlot } from "libs/endpoints/timeSlot";


const AddSchedule = () => {
    const [Employee, setEmployee] = useState([]);
    const [TimeSlots, setTimeSlots] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
    await addSchedule(formData);
    router.push("/admin/schedule");
    }

    const fetchEmployee = async () => {
        let employees = await getEmployee();
        setEmployee(employees);
      }

      const fetchTimeslots = async () => {
        let Timeslots = await getTimeSlot();
        setTimeSlots(Timeslots);
      }
      
    let fields: IFieldsProps = {
        title: "Add Schedule",
        disabled: false,
        fields: [
        ],
        dropDownLists:[
            { label: "Employee", name: "employeeId", placeholder: "Employee", value: "id", displayName: "employeeFirstName", data: Employee},
            { label: "Time Slot Id", name: "timeSlotId", placeholder: "Time Slot Id",  value: "id", displayName: "startTime", data: TimeSlots},
        ],
        heading: "Create Schedule",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
      fetchEmployee();
      fetchTimeslots();
    },[]);

      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        dropDownLists={fields.dropDownLists}
        heading={fields.heading}
        data={fields.data}
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddSchedule;
