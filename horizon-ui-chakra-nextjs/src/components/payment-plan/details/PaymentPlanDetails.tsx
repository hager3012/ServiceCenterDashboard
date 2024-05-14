
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IPaymentPlanList } from 'types/PaymentPlan';
import { useRouter } from 'next/navigation';
import { getByIdPaymentPlan } from 'libs/endpoints/payment-plan';

const PaymentPlanDetails = ({ id }: { id: string }) => {
  const [PaymentPlan, setPaymentPlan] = useState<IPaymentPlanList>();
 
  const router = useRouter();

  const fetchPaymentPlan = async () => {
    setPaymentPlan(await getByIdPaymentPlan(id));
  };

 
  useEffect(() => {
    fetchPaymentPlan();
   }, [])

  const handleSubmit = async (formData: IPaymentPlanList) => {
    router.push('/admin/payment-plan');
  };

  let fields: IFieldsProps = {
    title: 'PaymentPlan Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Terms", name: "terms", inputType: "text", placeholder: "Terms"},
        {label: "Down Payment Percentage", name: "downPaymentPercentage", inputType: "number", placeholder: "Down Payment Percentage"},
        {label: "Installment Count", name: "installmentCount", inputType: "number", placeholder: "Installment Count"},
        {label: "Interest Rate", name: "interestRate", inputType: "number", placeholder: "Interest Rate"},
    ],
    heading: 'Back to PaymentPlans',
    data: PaymentPlan,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchPaymentPlan();
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




export default PaymentPlanDetails;
