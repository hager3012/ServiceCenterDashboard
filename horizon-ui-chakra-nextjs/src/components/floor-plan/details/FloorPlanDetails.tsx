
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IFloorPlanList } from 'types/FloorPlan';
import { useRouter } from 'next/navigation';
import { getByIdFloorPlan } from 'libs/endpoints/floor-plan';

const FloorPlanDetails = ({ id }: { id: string }) => {
  const [FloorPlan, setFloorPlan] = useState<IFloorPlanList>();
 
  const router = useRouter();

  const fetchFloorPlan = async () => {
    setFloorPlan(await getByIdFloorPlan(id));
  };

 
  useEffect(() => {
    fetchFloorPlan();
   }, [])

  const handleSubmit = async (formData: IFloorPlanList) => {
    router.push('/admin/floor-plan');
  };

  let fields: IFieldsProps = {
    title: 'FloorPlan Details',
    disabled: true,
    fields: [
        {label: "Image Url", name: "imageURL", inputType: "text", placeholder: "Image Url"},
        {label: "Caption", name: "caption", inputType: "text", placeholder: "Caption"},
    ],
    heading: 'Back to FloorPlans',
    data: FloorPlan,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchFloorPlan();
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




export default FloorPlanDetails;
