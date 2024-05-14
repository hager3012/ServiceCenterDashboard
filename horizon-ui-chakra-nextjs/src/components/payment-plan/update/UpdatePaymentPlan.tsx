
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IPaymentPlan, IPaymentPlanList } from 'types/PaymentPlan';
import { getByIdPaymentPlan, updatePaymentPlan } from 'libs/endpoints/payment-plan';

const PaymentPlanUpdateForm = ({ id }: { id: string }) => {
  const [PaymentPlan, setPaymentPlan] = useState<IPaymentPlanList>();

  const router = useRouter();

  const fetchPaymentPlan = async () => {
    setPaymentPlan(await getByIdPaymentPlan(id));
  };

  

  useEffect(() => {
    fetchPaymentPlan();
}, [])

  const handleSubmit = async (formData: IPaymentPlan) => {
    await updatePaymentPlan(formData, id);
    router.push('/admin/payment-plan');
  };

  let fields: IFieldsProps = {
    title: 'Update PaymentPlan ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Terms", name: "terms", inputType: "text", placeholder: "Terms"},
        {label: "Down Payment Percentage", name: "downPaymentPercentage", inputType: "number", placeholder: "Down Payment Percentage"},
        {label: "Installment Count", name: "installmentCount", inputType: "number", placeholder: "Installment Count"},
        {label: "Interest Rate", name: "interestRate", inputType: "number", placeholder: "Interest Rate"},
    ],
   
    heading: 'Update PaymentPlan',
    data: PaymentPlan,
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

export default PaymentPlanUpdateForm;