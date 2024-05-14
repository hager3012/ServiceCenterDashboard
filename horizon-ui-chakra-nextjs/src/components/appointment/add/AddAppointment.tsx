'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addAppointment, getAppointment } from "libs/endpoints/appointment";
import { getClient } from "libs/endpoints/client";
import { getSchedule } from "libs/endpoints/schedule";

const Addappointment = () => {
    const [appointment, setappointment] = useState([]);
    const [client, setClient] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addAppointment(formData);
        router.push("/admin/appointment");
    }

    const fetchappointments = async () => {
        let appointments = await getAppointment();
        setappointment(appointments);
    }
    const fetchClient = async () => {
        let client = await getClient();
        setClient(client);
    }

    var dropdownOptions = schedule.map(function(item) {
        return {
            label: "Schedule",
            name: "scheduleId",
            displayName: item.day + " " + item.startTime,
            value: item.id,
            placeholder: "Schedule",
            data: schedule
        };
    });
    const fetchSchedule = async () => {
        let schedule = await getSchedule();
        setSchedule(schedule);
    }
    let fields: IFieldsProps = {
        title: "Add appointment",
        disabled: false,
        fields: [

        ],
        dropDownLists: [
            {label: "Agent Name", name: "clientId", displayName: "email", placeholder: "Client Name", value: "id", data: client},
            {label: "Schedule", name: "scheduleId", displayName:"day", placeholder: "Schedule", value: "id", data: schedule},
        ],
        heading: "Create Appointment",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchappointments();
        fetchClient();
        fetchSchedule();
      
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

export default Addappointment;
