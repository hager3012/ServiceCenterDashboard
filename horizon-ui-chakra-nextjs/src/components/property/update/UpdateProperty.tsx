
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { getByIdProperty, updateProperty } from 'libs/endpoints/property';
import { getPaymentPlan } from 'libs/endpoints/payment-plan';
import { IProperty, IPropertyList, PropertyImage } from 'types/Property';
import { getProject } from 'libs/endpoints/project';

const PropertyUpdateForm = ({ id }: { id: string }) => {
    const [Property, setProperty] = useState<IPropertyList>();
    const [Project, setProject] = useState([]);
    const [PaymentPlan, setPaymentPlan] = useState([]);
    const router = useRouter();

    const fetchProperty = async () => {
        let Property = await getByIdProperty(id);
        setProperty(Property);
    }

    const fetchProjects = async () => {
        let Projects = await getProject();
        setProject(Projects);
    }

    const fetchPaymentPlans = async () => {
        let PaymentPlans = await getPaymentPlan();
        setPaymentPlan(PaymentPlans);
    }

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

    await updateProperty(property, id);
    router.push('/admin/property');
  };

let fields: IFieldsProps = {
    title: "Add PropertyCategory",
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
    data: Property,
    onSubmit: handleSubmit,
   
  }

  useEffect(() => {
    fetchProperty();
    fetchProjects();
    fetchPaymentPlans();
    },[]);

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

export default PropertyUpdateForm;