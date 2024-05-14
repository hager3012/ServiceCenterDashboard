
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IDeveloper, IDeveloperList } from 'types/Developer';
import { getByIdDeveloper, updateDeveloper } from 'libs/endpoints/developer';

const DeveloperUpdateForm = ({ id }: { id: string }) => {
  const [Developer, setDeveloper] = useState<IDeveloperList>();

  const router = useRouter();

  const fetchDeveloper = async () => {
    setDeveloper(await getByIdDeveloper(id));
  };

  

  useEffect(() => {
    fetchDeveloper();
}, [])

  const handleSubmit = async (formData: IDeveloper) => {
    await updateDeveloper(formData, id);
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Update Developer ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},,
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Logo Url", name: "logoUrl", inputType: "text", placeholder: "LogoUrl"},
        {label: "Established Date", name: "establishedDate", inputType: "date", placeholder: "EstablishedDate"}
    ],
   
    heading: 'Update Developer',
    data: Developer,
    onSubmit: handleSubmit,
  };

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

export default DeveloperUpdateForm;