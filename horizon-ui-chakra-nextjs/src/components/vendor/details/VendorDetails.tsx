
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IVendorList } from 'types/Vendor';
import { useRouter } from 'next/navigation';
import { getByIdVendor } from 'libs/endpoints/vendor';

const VendorDetails = ({ id }: { id: string }) => {
  const [Vendor, setVendor] = useState<IVendorList>();
 
  const router = useRouter();

  const fetchVendor = async () => {
    setVendor(await getByIdVendor(id));
  };

 
  useEffect(() => {
    fetchVendor();
   }, [])

  const handleSubmit = async (formData: IVendorList) => {
    router.push('/admin/vendor');
  };

  let fields: IFieldsProps = {
    title: 'Vendor Details',
    disabled: true,
    fields: [
        {label: "Vendor First Name", name: "vendorFirstName", inputType: "text", placeholder: "Vendor First Name"},
        {label: "Vendor last Name", name: "vendorLastName", inputType: "text", placeholder: "Vendor Last Name"},
        {label: "Vendor Email", name: "vendorEmail", inputType: "text", placeholder: "Vendor Email"},
        {label: "Vendor Phone Number", name: "vendorPhoneNumber", inputType: "text", placeholder: "Vendor Phone Number"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Contact Person", name: "contactPerson", inputType: "text", placeholder: "Contact Person"},
        {label: "Contract Start Date", name: "contractStartDate", inputType: "date", placeholder: "Contract Start Date"},
        {label: "Contract End Date", name: "contractEndDate", inputType: "date", placeholder: "Contract End Date"},
      ],
    heading: 'Back to Vendors',
    data: Vendor,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchVendor();
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




export default VendorDetails;
