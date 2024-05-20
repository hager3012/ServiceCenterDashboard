'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IRatingServiceList, IRatingService } from 'types/RatingService';
import { GetByIdRatingService, UpdateRatingService } from 'libs/endpoints/RatingService';
import { GetService } from 'libs/endpoints/service';
import { getCustomer } from 'libs/endpoints/customer';

const RatingServiceUpdateForm = ({ id }: { id: string }) => {
  const [RatingService, setRatingService] = useState<IRatingServiceList>();
  const [Category, setCategory] = useState([]);
  const router = useRouter();
  const [Customers, setCustomers] = useState([]);

  


  const fetchCustomers = async () => {
    let Customer = await getCustomer();
    setCustomers(Customer);
  }
  

  const fetchService = async () => {
    let Category = await GetService();
    setCategory(Category);
  }
  

  const fetchRatingService = async () => {
    setRatingService(await GetByIdRatingService(id));
  };

  
  

  useEffect(() => {
    fetchService();
    fetchRatingService();
    fetchCustomers();
}, [])

  const handleSubmit = async (formData: IRatingService) => {
    await UpdateRatingService(formData, id);
    router.push('/admin/ratingService');
  };

  let fields: IFieldsProps = {
    title: 'RatingService Details',
    disabled: false,
    fields: [
      { label: 'Rating Value', name: 'ratingValue', inputType: 'number', placeholder: 'Rate' },
    ],
    dropDownLists:[
       {label: "Service", name: "serviceId", placeholder: "Service", value: "id", displayName: "serviceName", data: Category},
       {label: "Customer", name: "customerId", placeholder: "Customer", value: "id", displayName: "customerFirstName", data: Customers},
      ],
    heading: 'Update RatingService',
    data: RatingService,
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

export default RatingServiceUpdateForm;