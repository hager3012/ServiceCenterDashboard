
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IFeedbackList } from 'types/Feedback';
import { useRouter } from 'next/navigation';
import { getByIdFeedback } from 'libs/endpoints/feedback';

const FeedbackDetails = ({ id }: { id: string }) => {
  const [Feedback, setFeedback] = useState<IFeedbackList>();
 
  const router = useRouter();

  const fetchFeedback = async () => {
    setFeedback(await getByIdFeedback(id));
  };

 
  useEffect(() => {
    fetchFeedback();
   }, [])

  const handleSubmit = async (formData: IFeedbackList) => {
    router.push('/admin/feedback');
  };

  let fields: IFieldsProps = {
    title: 'Feedback Details',
    disabled: true,
    fields: [
      {label: "Date", name: "feedbackDate", inputType: "date", placeholder: "Date"},
      {label: "Description", name: "feedbackDescription", inputType: "text", placeholder: "Description"},
      {label: "Feedback Category", name: "feedbackCategory", inputType: "text", placeholder: "Category"}
    ],
    heading: 'Back to Feedbacks',
    data: Feedback,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchFeedback();
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




export default FeedbackDetails;
