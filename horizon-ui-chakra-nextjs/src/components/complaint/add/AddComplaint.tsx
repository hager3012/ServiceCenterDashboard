'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { AddComplaint } from 'libs/endpoints/complaint';
import { IComplaint } from 'types/Complaint';
import { getCustomer } from 'libs/endpoints/customer';

const ComplaintAddForm = () => {
  const [Customer, setCustomer] = useState([]);
  const router = useRouter();

  const fetchCustomer = async () => {
    let customers = await getCustomer();
    setCustomer(customers);
  }

  useEffect(() => {
    fetchCustomer();
}, [])

  const handleSubmit = async (formData: IComplaint) => {
    await AddComplaint(formData);
    router.push('/admin/complaint');
  };

  let fields: IFieldsProps = {
    title: 'Create Complaint',
    disabled: false,
    fields: [
      { label: 'Complaint Date', name: 'complaintDate', inputType: 'date', placeholder: 'Date' },
      { label: 'Complaint Description', name: 'complaintDescription', inputType: 'text', placeholder: 'Complaint Description' },
      { label: 'Complaint Category', name: 'complaintCategory', inputType: 'text', placeholder: 'Complaint Category' },
      { label: 'Complaint Status', name: 'complaintStatus', inputType: 'text', placeholder: 'Complaint Status' },
    ],
    dropDownLists:[
       {label: "Customer", name: "customerId", placeholder: "Customer", value: "id", displayName: "customerFirstName", data: Customer},
    ],
    heading: 'Add Complaint',
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

export default ComplaintAddForm;