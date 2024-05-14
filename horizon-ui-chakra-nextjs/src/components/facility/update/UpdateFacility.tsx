
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IFacility, IFacilityList } from 'types/Facility';
import { getByIdFacility, updateFacility } from 'libs/endpoints/facility';

const FacilityUpdateForm = ({ id }: { id: string }) => {
  const [Facility, setFacility] = useState<IFacilityList>();

  const router = useRouter();

  const fetchFacility = async () => {
    setFacility(await getByIdFacility(id));
  };

  

  useEffect(() => {
    fetchFacility();
}, [])

  const handleSubmit = async (formData: IFacility) => {
    await updateFacility(formData, id);
    router.push('/admin/facility');
  };

  let fields: IFieldsProps = {
    title: 'Update Facility ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},,
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"}
    ],
   
    heading: 'Update Facility',
    data: Facility,
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

export default FacilityUpdateForm;