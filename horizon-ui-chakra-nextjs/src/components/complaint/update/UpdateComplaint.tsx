'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IComplaintList, IComplaint } from 'types/Complaint';
import { GetByIdComplaint, UpdateComplaint } from 'libs/endpoints/complaint';
import { GetCustomer } from 'libs/endpoints/customer';

const ComplaintUpdateForm = ({ id }: { id: string }) => {
  const [Complaint, setComplaint] = useState<IComplaintList>();
  const [Customer, setCustomer] = useState([]);

  const router = useRouter();

  const fetchComplaint = async () => {
    setComplaint(await GetByIdComplaint(id));
  };

  const fetchCustomer = async () => {
    let customers = await GetCustomer();
    setCustomer(customers);
  }

  useEffect(() => {
    fetchCustomer();
    fetchComplaint();
}, [])

  const handleSubmit = async (formData: IComplaint) => {
    await UpdateComplaint(formData, id);
    router.push('/admin/complaint');
  };

  let fields: IFieldsProps = {
    title: 'Complaint Details',
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
    heading: 'Update Complaint',
    data: Complaint,
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

export default ComplaintUpdateForm;