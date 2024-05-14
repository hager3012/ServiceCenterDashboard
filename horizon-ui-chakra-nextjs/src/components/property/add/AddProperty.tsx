'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addProperty, getProperty } from "libs/endpoints/property";
import { getProject } from "libs/endpoints/project";
import { getPaymentPlan } from "libs/endpoints/payment-plan";
import { IProperty, PropertyImage } from "types/Property";

const AddProperty = () => {
    const [Property, setProperty] = useState([]);
    const [Project, setProject] = useState([]);
    const [PaymentPlan, setPaymentPlan] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {

        const imagesUrls = formData.images ? formData.images.split(",") : [];

        const facilitiesIds = formData.facilities ? formData.facilities.split(",") : [];

        const images: PropertyImage[] = imagesUrls.map((url: any) => ({
            imageUrl: url
        }));

        const property: IProperty = {
            name: formData.name,
            type: formData.type,
            address: formData.address,
            size: formData.size,
            price: formData.price,
            images: images,
            projectId: formData.projectId,
            paymentPlanId: formData.paymentPlanId,
            facilitiesId: facilitiesIds
        }

        console.log(property)

        await addProperty(property);
        router.push("/admin/property");
    }

    const fetchPropertys = async () => {
        let Propertys = await getProperty();
        setProperty(Propertys);
    }

    const fetchProjects = async () => {
        let Projects = await getProject();
        setProject(Projects);
    }

    const fetchPaymentPlans = async () => {
        let PaymentPlans = await getPaymentPlan();
        setPaymentPlan(PaymentPlans);
    }

    let fields: IFieldsProps = {
        title: "Add Property",
        disabled: false,
        fields: [
            {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
            {label: "Typr", name: "type", inputType: "text", placeholder: "Property Type"},
            {label: "Size", name: "size", inputType: "number", placeholder: "Property Size"},
            {label: "Price", name: "price", inputType: "number", placeholder: "Property Price"},
            {label: "Address", name: "address", inputType: "text", placeholder: "Property Address"},
            {label: "Facilities Ids", name: "facilities", inputType: "text", placeholder: "Facilities Ids (Split by ,)"},
            {label: "Images", name: "images", inputType: "text", placeholder: "Images (splitted by ,)"}
        ],
        dropDownLists: [
            {label: "Project  Name", name: "projectId", displayName: "name", placeholder: "Project Name", value: "id", data: Project},
            {label: "Payment Plan", name: "paymentPlanId", displayName: "name", placeholder: "Payment Plan", value: "id", data: PaymentPlan}
        ],
        heading: "Create Property",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchPropertys();
        fetchProjects();
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

export default AddProperty;
