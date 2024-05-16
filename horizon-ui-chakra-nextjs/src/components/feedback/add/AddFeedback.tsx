'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addFeedback, getFeedback } from "libs/endpoints/feedback";

const AddFeedback = () => {
    const [Feedback, setFeedback] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addFeedback(formData);
        router.push("/admin/feedback");
    }

    const fetchFeedbacks = async () => {
        let Feedbacks = await getFeedback();
        setFeedback(Feedbacks);
    }

    let fields: IFieldsProps = {
        title: "Add Feedback",
        disabled: false,
        fields: [
            {label: "Date", name: "feedbackDate", inputType: "date", placeholder: "Date"},
            {label: "Description", name: "feedbackDescription", inputType: "text", placeholder: "Description"},
            {label: "Feedback Category", name: "feedbackCategory", inputType: "text", placeholder: "Category"}
        ],
        heading: "Create Feedback",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchFeedbacks();
      
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

export default AddFeedback;
