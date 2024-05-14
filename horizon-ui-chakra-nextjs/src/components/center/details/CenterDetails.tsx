
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  ICenterList } from 'types/Center';
import { useRouter } from 'next/navigation';
import { getByIdCenter } from 'libs/endpoints/center';

const CenterDetails = ({ id }: { id: string }) => {
  const [Center, setCenter] = useState<ICenterList>();
 
  const router = useRouter();

  const fetchCenter = async () => {
    setCenter(await getByIdCenter(id));
  };

 
  useEffect(() => {
    fetchCenter();
   }, [])

  const handleSubmit = async (formData: ICenterList) => {
    router.push('/admin/center');
  };

  let fields: IFieldsProps = {
    title: 'Center Details',
    disabled: true,
    fields: [
        {label: "Name", name: "centerName", inputType: "text", placeholder: "Name"},
        {label: "Opening Hours", name: "openingHours", inputType: "number", placeholder: "Opening Hours"},
        {label: "Specialty", name: "specialty", inputType: "text", placeholder: "Specialty"}
    ],
    heading: 'Back to Centers',
    data: Center,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchCenter();
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




export default CenterDetails;
