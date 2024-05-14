'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addPaymentPlan, getPaymentPlan } from "libs/endpoints/payment-plan";

const AddPaymentPlan = () => {
    const [PaymentPlan, setPaymentPlan] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addPaymentPlan(formData);
        router.push("/admin/payment-plan");
    }

    const fetchPaymentPlans = async () => {
        let PaymentPlans = await getPaymentPlan();
        setPaymentPlan(PaymentPlans);
    }

    let fields: IFieldsProps = {
        title: "Add PaymentPlan",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
            {label: "Terms", name: "terms", inputType: "text", placeholder: "Terms"},
            {label: "Down Payment Percentage", name: "downPaymentPercentage", inputType: "number", placeholder: "Down Payment Percentage"},
            {label: "Installment Count", name: "installmentCount", inputType: "number", placeholder: "Installment Count"},
            {label: "Interest Rate", name: "interestRate", inputType: "number", placeholder: "Interest Rate"},
        ],
        heading: "Create PaymentPlan",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchPaymentPlans();
      
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

export default AddPaymentPlan;
