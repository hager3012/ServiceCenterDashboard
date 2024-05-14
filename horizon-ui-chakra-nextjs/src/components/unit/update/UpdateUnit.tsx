
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IUnit, IUnitList } from 'types/Unit';
import { getByIdUnit, updateUnit } from 'libs/endpoints/unit';
import { getProperty } from 'libs/endpoints/property';
import { getPaymentPlan } from 'libs/endpoints/payment-plan';

const UnitUpdateForm = ({ id }: { id: string }) => {
  const [Unit, setUnit] = useState<IUnitList>();
  const [Property, setProperty] = useState([]);
  const [PaymentPlan, setPaymentPlan] = useState([]);
  const router = useRouter();

  const fetchUnit = async () => {
    setUnit(await getByIdUnit(id));
  };

    const fetchPropertys = async () => {
        let Propertys = await getProperty();
        setProperty(Propertys);
    }

    const fetchPaymentPlans = async () => {
        let PaymentPlans = await getPaymentPlan();
        setPaymentPlan(PaymentPlans);
    }  

  useEffect(() => {
    fetchUnit();
    fetchPaymentPlans();
    fetchPropertys();
}, [])

  const handleSubmit = async (formData: IUnit) => {
    await updateUnit(formData, id);
    router.push('/admin/unit');
  };

  let fields: IFieldsProps = {
    title: 'Update Unit ',
    disabled: false,
    fields: [
        {label: "Unit Number", name: "unitNumber", inputType: "number", placeholder: "Unit Number"},
        {label: "Floor", name: "floor", inputType: "number", placeholder: "Floor"},
        {label: "Size", name: "size", inputType: "number", placeholder: "Size"},
        {label: "Bedrooms", name: "bedrooms", inputType: "number", placeholder: "Bedrooms"},
        {label: "Bathrooms", name: "bathrooms", inputType: "number", placeholder: "Bathrooms"},
        {label: "Status", name: "status", inputType: "text", placeholder: "Status"},
    ],
    dropDownLists: [
        {label: "Property Name", name: "propertyId", displayName: "name", placeholder: "Property Name", value: "id", data: Property},
        {label: "Payment Plan", name: "paymentPlanId", displayName: "name", placeholder: "Payment Plan Name", value: "id", data: PaymentPlan},
    ],
    heading: 'Update Unit',
    data: Unit,
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

export default UnitUpdateForm;