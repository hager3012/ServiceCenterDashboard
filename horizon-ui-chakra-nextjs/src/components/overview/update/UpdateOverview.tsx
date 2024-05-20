
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IOverview, IOverviewList } from 'types/Overview';
import { getByIdOverview, updateOverview } from 'libs/endpoints/overview';
import { getSales } from 'libs/endpoints/sales';

const OverviewUpdateForm = ({ id }: { id: string }) => {
  const [Overview, setOverview] = useState<IOverviewList>();
  const [Saless, setSaless] = useState([]);
  const router = useRouter();

  const fetchOverview = async () => {
    setOverview(await getByIdOverview(id));
  };

  const fetchSaless = async () => {
    let Sales = await getSales();
    setSaless(Sales);
  }

  useEffect(() => {
    fetchOverview();
    fetchSaless();
}, [])

  const handleSubmit = async (formData: IOverview) => {
    await updateOverview(formData, id);
    router.push('/admin/overview');
  };

  let fields: IFieldsProps = {
    title: 'Update Overview ',
    disabled: false,
    fields: [
      {label: "Task", name: "task", inputType: "text", placeholder: "Task"},
      {label: "Priority", name: "priority", inputType: "text", placeholder: "Priority"},
      {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
      {label: "Due Date", name: "dueDate", inputType: "date", placeholder: "Due Date"}
  ],
  dropDownLists: [
      {label: "Sales", name: "salesId", displayName: "salesFirstName", placeholder: "Sales", value: "id", data: Saless},
  ],
    heading: 'Update Overview',
    data: Overview,
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

export default OverviewUpdateForm;