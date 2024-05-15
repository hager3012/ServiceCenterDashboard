'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IDepartmentList, IDepartment } from 'types/Department';
import { GetByIdDepartment, UpdateDepartment } from 'libs/endpoints/department';
import { getCenter } from 'libs/endpoints/center';

const DepartmentUpdateForm = ({ id }: { id: string }) => {
  const [Department, setDepartment] = useState<IDepartmentList>();
  const [Center, setCenter] = useState([]);

  const router = useRouter();

  const fetchDepartment = async () => {
    setDepartment(await GetByIdDepartment(id));
  };

  const fetchCenter = async () => {
    let centers = await getCenter();
    setCenter(centers);
  }

  useEffect(() => {
    fetchCenter();
    fetchDepartment();
}, [])

  const handleSubmit = async (formData: IDepartment) => {
    await UpdateDepartment(formData, id);
    router.push('/admin/department');
  };

  let fields: IFieldsProps = {
    title: 'Department Details',
    disabled: false,
    fields: [
      { label: 'Department Name ', name: 'departmentName', inputType: 'text', placeholder: 'Department Name' },
      { label: 'Center Name ', name: 'centerName', inputType: 'text', placeholder: 'Center Name' }
    ],
    dropDownLists:[
        {label: "Centers", name: "centerId", placeholder: "Center", value: "id", displayName: "centerName", data: Center},
     ],
    heading: 'Update Department',
    data: Department,
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

export default DepartmentUpdateForm;