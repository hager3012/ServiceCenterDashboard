
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IPropertyList } from 'types/Property';
import { getByIdProperty } from 'libs/endpoints/property';

const PropertyDetails = ({ id }: { id: string }) => {
  const [Property, setProperty] = useState<IPropertyList>();
 
  const router = useRouter();

  const fetchProperty = async () => {
    setProperty(await getByIdProperty(id));
  };

 
  useEffect(() => {
    fetchProperty();
   }, [])

  const handleSubmit = async (formData: IPropertyList) => {
    router.push('/admin/property');
  };

  let fields: IFieldsProps = {
    title: 'Property Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Typr", name: "type", inputType: "text", placeholder: "Property Type"},
        {label: "Size", name: "size", inputType: "number", placeholder: "Property Size"},
        {label: "Price", name: "price", inputType: "number", placeholder: "Property Price"},
        {label: "Address", name: "address", inputType: "text", placeholder: "Property Address"},
    ],
    heading: 'Back to Propertys',
    data: Property,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default PropertyDetails;
