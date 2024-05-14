
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ICity, ICityList } from 'types/City';
import { getByIdCity, updateCity } from 'libs/endpoints/city';

const CityUpdateForm = ({ id }: { id: string }) => {
  const [City, setCity] = useState<ICityList>();

  const router = useRouter();

  const fetchCity = async () => {
    setCity(await getByIdCity(id));
  };

  

  useEffect(() => {
    fetchCity();
}, [])

  const handleSubmit = async (formData: ICity) => {
    await updateCity(formData, id);
    router.push('/admin/city');
  };

  let fields: IFieldsProps = {
    title: 'Update City ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "image", name: "image", inputType: "text", placeholder: "Image"}
    ],
   
    heading: 'Update City',
    data: City,
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

export default CityUpdateForm;