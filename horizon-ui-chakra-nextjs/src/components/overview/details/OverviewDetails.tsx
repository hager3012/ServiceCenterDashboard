
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IOverviewList } from 'types/Overview';
import { useRouter } from 'next/navigation';
import { getByIdOverview } from 'libs/endpoints/overview';

const OverviewDetails = ({ id }: { id: string }) => {
  const [Overview, setOverview] = useState<IOverviewList>();
 
  const router = useRouter();

  const fetchOverview = async () => {
    setOverview(await getByIdOverview(id));
  };

 
  useEffect(() => {
    fetchOverview();
   }, [])

  const handleSubmit = async (formData: IOverviewList) => {
    router.push('/admin/developer');
  };

  let fields: IFieldsProps = {
    title: 'Overview Details',
    disabled: true,
    fields: [
      {label: "Task", name: "task", inputType: "text", placeholder: "Task"},
      {label: "Priority", name: "priority", inputType: "text", placeholder: "Priority"},
      {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
      {label: "Due Date", name: "dueDate", inputType: "date", placeholder: "Due Date"},
    ],
    heading: 'Back to Overviews',
    data: Overview,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchOverview();
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




export default OverviewDetails;
