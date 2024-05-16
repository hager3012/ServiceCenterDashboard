
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IFeedback, IFeedbackList } from 'types/Feedback';
import { getByIdFeedback, updateFeedback } from 'libs/endpoints/feedback';

const FeedbackUpdateForm = ({ id }: { id: string }) => {
  const [Feedback, setFeedback] = useState<IFeedbackList>();

  const router = useRouter();

  const fetchFeedback = async () => {
    setFeedback(await getByIdFeedback(id));
  };

  

  useEffect(() => {
    fetchFeedback();
}, [])

  const handleSubmit = async (formData: IFeedback) => {
    await updateFeedback(formData, id);
    router.push('/admin/feedback');
  };

  let fields: IFieldsProps = {
    title: 'Update Feedback ',
    disabled: false,
    fields: [
      {label: "Date", name: "feedbackDate", inputType: "date", placeholder: "Date"},
      {label: "Description", name: "feedbackDescription", inputType: "text", placeholder: "Description"},
      {label: "Feedback Category", name: "feedbackCategory", inputType: "text", placeholder: "Category"}
    ],
   
    heading: 'Update Feedback',
    data: Feedback,
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

export default FeedbackUpdateForm;