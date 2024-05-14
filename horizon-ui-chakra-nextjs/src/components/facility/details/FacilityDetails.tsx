
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IFacilityList } from 'types/Facility';
import { useRouter } from 'next/navigation';
import { getByIdFacility } from 'libs/endpoints/facility';

const FacilityDetails = ({ id }: { id: string }) => {
  const [Facility, setFacility] = useState<IFacilityList>();
 
  const router = useRouter();

  const fetchFacility = async () => {
    setFacility(await getByIdFacility(id));
  };

 
  useEffect(() => {
    fetchFacility();
   }, [])

  const handleSubmit = async (formData: IFacilityList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Facility Details',
    disabled: true,
    fields: [
      {label: "Name", name: "name", inputType: "text", placeholder: "Name"},,
      {label: "Description", name: "description", inputType: "text", placeholder: "Description"}
    ],
    heading: 'Back to Facilitys',
    data: Facility,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchFacility();
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




export default FacilityDetails;
