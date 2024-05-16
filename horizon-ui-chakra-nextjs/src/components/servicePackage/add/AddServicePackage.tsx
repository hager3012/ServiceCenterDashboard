'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { AddServicePackage } from 'libs/endpoints/servicePackage';
import { IServicePackage } from 'types/ServicePackage';
import { GetService } from 'libs/endpoints/service';

const ServicePackageAddForm = () => {
  const [Category, setCategory] = useState([]);
  const router = useRouter();

  

  const fetchService = async () => {
    let Category = await GetService();
    setCategory(Category);
  }

  

  useEffect(() => {
    
    fetchService();
}, [])

  const handleSubmit = async (formData: IServicePackage) => {
    await AddServicePackage(formData);
    router.push('/admin/servicePackage');
  };

  let fields: IFieldsProps = {
    title: 'Create ServicePackage',
    disabled: false,
    fields: [
      { label: 'Package Name', name: 'packageName', inputType: 'text', placeholder: 'Name' },
      { label: 'Package Description', name: 'packageDescription', inputType: 'text', placeholder: 'Package Description' },
      { label: 'Package Price', name: 'packagePrice', inputType: 'number', placeholder: 'Package Price' },
    ],
    dropDownLists:[
       {label: "Service", name: "serviceId", placeholder: "Service", value: "id", displayName: "serviceName", data: Category},
      ],
    heading: 'Add ServicePackage',
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownLists={fields.dropDownLists}
      heading={fields.heading}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default ServicePackageAddForm;