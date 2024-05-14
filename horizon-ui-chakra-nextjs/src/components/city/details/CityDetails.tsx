
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  ICityList } from 'types/City';
import { useRouter } from 'next/navigation';
import { getByIdCity } from 'libs/endpoints/city';

const CityDetails = ({ id }: { id: string }) => {
  const [City, setCity] = useState<ICityList>();
 
  const router = useRouter();

  const fetchCity = async () => {
    setCity(await getByIdCity(id));
  };

 
  useEffect(() => {
    fetchCity();
   }, [])

  const handleSubmit = async (formData: ICityList) => {
    router.push('/admin/city');
  };

  let fields: IFieldsProps = {
    title: 'City Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Image", name: "image", inputType: "text", placeholder: "Image"}
    ],
    heading: 'Back to Citys',
    data: City,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchCity();
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




export default CityDetails;
