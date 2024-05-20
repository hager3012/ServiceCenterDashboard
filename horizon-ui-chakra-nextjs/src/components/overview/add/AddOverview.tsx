'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addOverview, getOverview } from "libs/endpoints/overview";
import { getSales } from "libs/endpoints/sales";

const AddOverview = () => {
    const [Overview, setOverview] = useState([]);
    const [Saless, setSaless] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addOverview(formData);
        router.push("/admin/overview");
    }

    const fetchOverviews = async () => {
        let Overviews = await getOverview();
        setOverview(Overviews);
    }

    const fetchSaless = async () => {
        let Sales = await getSales();
        setSaless(Sales);
    }

    let fields: IFieldsProps = {
        title: "Add Overview",
        disabled: false,
        fields: [
            {label: "Task", name: "task", inputType: "text", placeholder: "Task"},
            {label: "Priority", name: "priority", inputType: "text", placeholder: "Priority"},
            {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
            {label: "Due Date", name: "dueDate", inputType: "date", placeholder: "Due Date"}
        ],
        dropDownLists: [
            {label: "Sales", name: "salesId", displayName: "salesFirstName", placeholder: "Sales", value: "id", data: Saless},
        ],
        heading: "Create Overview",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchOverviews();
        fetchSaless();
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

export default AddOverview;
