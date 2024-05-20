'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { AddRatingService } from 'libs/endpoints/RatingService';
import { IRatingService } from 'types/RatingService';
import { GetService } from 'libs/endpoints/service';
import { getCustomer } from 'libs/endpoints/customer';

const RatingServiceAddForm = () => {
  const [Category, setCategory] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const router = useRouter();

  

  const fetchService = async () => {
    let Category = await GetService();
    setCategory(Category);
  }

  const fetchCustomers = async () => {
    let Customer = await getCustomer();
    setCustomers(Customer);
  }

  

  useEffect(() => {
    
    fetchService();
    fetchCustomers();
}, [])

  const handleSubmit = async (formData: IRatingService) => {
    await AddRatingService(formData);
    router.push('/admin/ratingService');
  };

  let fields: IFieldsProps = {
    title: 'Create RatingService',
    disabled: false,
    fields: [
      { label: 'Rating Value', name: 'ratingValue', inputType: 'number', placeholder: 'Rate' },
    ],
    dropDownLists:[
       {label: "Service", name: "serviceId", placeholder: "Service", value: "id", displayName: "serviceName", data: Category},
       {label: "Customer", name: "customerId", placeholder: "Customer", value: "id", displayName: "customerFirstName", data: Customers},
      ],
    heading: 'Add RatingService',
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

export default RatingServiceAddForm;