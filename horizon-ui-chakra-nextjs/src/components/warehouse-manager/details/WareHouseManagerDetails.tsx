
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IWareHouseManagerList } from 'types/WareHouseManager';
import { useRouter } from 'next/navigation';
import { getByIdWareHouseManager } from 'libs/endpoints/wareHouseManager';

const WareHouseManagerDetails = ({ id }: { id: string }) => {
  const [WareHouseManager, setWareHouseManager] = useState<IWareHouseManagerList>();
 
  const router = useRouter();

  const fetchWareHouseManager = async () => {
    setWareHouseManager(await getByIdWareHouseManager(id));
  };

 
  useEffect(() => {
    fetchWareHouseManager();
   }, [])

  const handleSubmit = async (formData: IWareHouseManagerList) => {
    router.push('/admin/wareHouseManager');
  };

  let fields: IFieldsProps = {
    title: 'WareHouseManager Details',
    disabled: true,
    fields: [
        {label: "WareHouseManager First Name", name: "wareHouseManagerFirstName", inputType: "text", placeholder: "WareHouseManager First Name"},
        {label: "WareHouseManager last Name", name: "wareHouseManagerLastName", inputType: "text", placeholder: "WareHouseManager Last Name"},
        {label: "WareHouseManager Email", name: "wareHouseManagerEmail", inputType: "text", placeholder: "WareHouseManager Email"},
        {label: "WareHouseManager Phone Number", name: "wareHouseManagerPhoneNumber", inputType: "text", placeholder: "WareHouseManager Phone Number"},
        {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
        {label: "Position Title", name: "positionTitle", inputType: "text", placeholder: "Position Title"},
        {label: "Inventory Name", name: "inventoryName", inputType: "text", placeholder: "Inventory Name"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
      ],
    heading: 'Back to WareHouseManagers',
    data: WareHouseManager,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchWareHouseManager();
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




export default WareHouseManagerDetails;
