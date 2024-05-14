
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IUnitList } from 'types/Unit';
import { useRouter } from 'next/navigation';
import { getByIdUnit } from 'libs/endpoints/unit';

const UnitDetails = ({ id }: { id: string }) => {
  const [Unit, setUnit] = useState<IUnitList>();
 
  const router = useRouter();

  const fetchUnit = async () => {
    setUnit(await getByIdUnit(id));
  };

 
  useEffect(() => {
    fetchUnit();
   }, [])

  const handleSubmit = async (formData: IUnitList) => {
    router.push('/admin/unit');
  };

  let fields: IFieldsProps = {
    title: 'Unit Details',
    disabled: true,
    fields: [
        {label: "Unit Number", name: "unitNumber", inputType: "number", placeholder: "Unit Number"},
        {label: "Floor", name: "floor", inputType: "number", placeholder: "Floor"},
        {label: "Size", name: "size", inputType: "number", placeholder: "Size"},
        {label: "Bedrooms", name: "bedrooms", inputType: "number", placeholder: "Bedrooms"},
        {label: "Bathrooms", name: "bathrooms", inputType: "number", placeholder: "Bathrooms"},
        {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
    ],
    heading: 'Back to Units',
    data: Unit,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchUnit();
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




export default UnitDetails;
