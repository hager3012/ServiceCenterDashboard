'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addUnit, getUnit } from "libs/endpoints/unit";
import { getProperty } from "libs/endpoints/property";
import { getPaymentPlan } from "libs/endpoints/payment-plan";

const AddUnit = () => {
    const [Property, setProperty] = useState([]);
    const [PaymentPlan, setPaymentPlan] = useState([]);
    const router = useRouter();

    const handleSubmit = async (formData: any) => {
        await addUnit(formData);
        router.push("/admin/unit");
    }

    const fetchPropertys = async () => {
        let Propertys = await getProperty();
        setProperty(Propertys);
    }

    const fetchPaymentPlans = async () => {
        let PaymentPlans = await getPaymentPlan();
        setPaymentPlan(PaymentPlans);
    }

    let fields: IFieldsProps = {
        title: "Add Unit",
        disabled: false,
        fields: [
            {label: "Unit Number", name: "unitNumber", inputType: "number", placeholder: "Unit Number"},
            {label: "Floor", name: "floor", inputType: "number", placeholder: "Floor"},
            {label: "Size", name: "size", inputType: "number", placeholder: "Size"},
            {label: "Bedrooms", name: "bedrooms", inputType: "number", placeholder: "Bedrooms"},
            {label: "Bathrooms", name: "bathrooms", inputType: "number", placeholder: "Bathrooms"},
            {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
        ],
        dropDownLists: [
            {label: "Property Name", name: "propertyId", displayName: "name", placeholder: "Property Name", value: "id", data: Property},
            {label: "Payment Plan", name: "paymentPlanId", displayName: "name", placeholder: "Payment Plan Name", value: "id", data: PaymentPlan},
        ],
        heading: "Create Unit",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchPropertys();
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

export default AddUnit;
