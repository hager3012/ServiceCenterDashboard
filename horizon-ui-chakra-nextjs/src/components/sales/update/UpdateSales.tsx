
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ISales, ISalesList } from 'types/Sales';
import { getByIdSales, updateSales } from 'libs/endpoints/sales';
import { GetDepartment } from 'libs/endpoints/department';

const SalesUpdateForm = ({ id }: { id: string }) => {
  const [Sales, setSales] = useState<ISalesList>();
  const router = useRouter();

  const fetchSales = async () => {
    setSales(await getByIdSales(id));
  };

  useEffect(() => {
    fetchSales();
}, [])

  const handleSubmit = async (formData: ISales) => {
    await updateSales(formData, id);
    router.push('/admin/sales');
  };

  let fields: IFieldsProps = {
    title: 'Update Sales ',
    disabled: false,
    fields: [
        {label: "Sales First Name", name: "salesFirstName", inputType: "text", placeholder: "Sales First Name"},
        {label: "Sales last Name", name: "salesLastName", inputType: "text", placeholder: "Sales Last Name"},
        {label: "Sales Email", name: "salesEmail", inputType: "text", placeholder: "Sales Email"},
        {label: "Sales Phone Number", name: "salesPhoneNumber", inputType: "text", placeholder: "Sales Phone Number"},
        {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
      ],
    heading: 'Update Sales',
    data: Sales,
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

export default SalesUpdateForm;