
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IFloorPlan, IFloorPlanList } from 'types/FloorPlan';
import { getByIdFloorPlan, updateFloorPlan } from 'libs/endpoints/floor-plan';
import { IPropertyList } from 'types/Property';
import { getProperty } from 'libs/endpoints/property';

const FloorPlanUpdateForm = ({ id }: { id: string }) => {
  const [FloorPlan, setFloorPlan] = useState<IFloorPlanList>();
  const [Property, setProperty] = useState([]);
  const router = useRouter();

  const fetchFloorPlan = async () => {
    setFloorPlan(await getByIdFloorPlan(id));
  };

  const fetchPropertys = async () => {
    let Property = await getProperty();
    setProperty(Property);
    }

  useEffect(() => {
    fetchFloorPlan();
    fetchPropertys();
}, [])

  const handleSubmit = async (formData: IFloorPlan) => {
    await updateFloorPlan(formData, id);
    router.push('/admin/floor-plan');
  };

  let fields: IFieldsProps = {
    title: 'Update FloorPlan ',
    disabled: false,
    fields: [
      {label: "Image Url", name: "imageURL", inputType: "text", placeholder: "Image Url"},
      {label: "Caption", name: "caption", inputType: "text", placeholder: "Caption"},
    ],
    dropDownLists: [
      {label: "Property Name", name: "propertyId", displayName: "name", placeholder: "Property Name", value: "id", data: Property},
    ],
    heading: 'Update FloorPlan',
    data: FloorPlan,
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

export default FloorPlanUpdateForm;