
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IDeveloperList } from 'types/Developer';
import { useRouter } from 'next/navigation';
import { getByIdDeveloper } from 'libs/endpoints/developer';

const DeveloperDetails = ({ id }: { id: string }) => {
  const [Developer, setDeveloper] = useState<IDeveloperList>();
 
  const router = useRouter();

  const fetchDeveloper = async () => {
    setDeveloper(await getByIdDeveloper(id));
  };

 
  useEffect(() => {
    fetchDeveloper();
   }, [])

  const handleSubmit = async (formData: IDeveloperList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Developer Details',
    disabled: true,
    fields: [
      {label: "Name", name: "name", inputType: "text", placeholder: "Name"},,
      {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
      {label: "Logo Url", name: "logoUrl", inputType: "text", placeholder: "LogoUrl"},
      {label: "Established Date", name: "establishedDate", inputType: "text", placeholder: "EstablishedDate"}
    ],
    heading: 'Back to Developers',
    data: Developer,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchDeveloper();
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




export default DeveloperDetails;
