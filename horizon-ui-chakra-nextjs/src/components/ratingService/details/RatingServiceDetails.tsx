'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IRatingServiceList } from 'types/RatingService';
import { GetByIdRatingService } from 'libs/endpoints/RatingService';

const RatingServiceDetails = ({ id }: { id: string }) => {
  const [ratingService, setRatingService] = useState<IRatingServiceList>();

  const router = useRouter();

  const fetchRatingService = async () => {
    setRatingService(await GetByIdRatingService(id));
  };

  useEffect(() => {
    fetchRatingService();
}, [])

  const handleSubmit = async (formData: IRatingServiceList) => {
    router.push('/admin/ratingService');
  };

  let fields: IFieldsProps = {
    title: 'RatingService Details',
    disabled: true,
    fields: [
      { label: 'Rating Value', name: 'ratingValue', inputType: 'number', placeholder: 'Rate' },
      { label: 'Service', name: 'serviceId', placeholder: 'Service', inputType: 'text' },
      { label: "Customer", name: "customerId", placeholder: "Customer", inputType:"text" },
    ],
    heading: 'Back to Service Packages',
    data: ratingService,
    onSubmit: handleSubmit,
  };

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

export default RatingServiceDetails;