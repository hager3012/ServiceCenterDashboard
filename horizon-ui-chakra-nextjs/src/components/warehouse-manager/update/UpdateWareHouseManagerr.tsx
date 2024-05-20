
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IWareHouseManager, IWareHouseManagerList } from 'types/WareHouseManager';
import { getByIdWareHouseManager, updateWareHouseManager } from 'libs/endpoints/wareHouseManager';
import { getInventory } from 'libs/endpoints/inventory';

const WareHouseManagerUpdateForm = ({ id }: { id: string }) => {
  const [inventory, seInventory] = useState([]);
  const [WareHouseManager, setWareHouseManager] = useState<IWareHouseManagerList>();
  const router = useRouter();

  const fetchWareHouseManager = async () => {
    setWareHouseManager(await getByIdWareHouseManager(id));
  };

  const fetchInventory = async () => {
    let inventorys = await getInventory();
    seInventory(inventorys);
  }

  useEffect(() => {
    fetchWareHouseManager();
    fetchInventory();
}, [])

  const handleSubmit = async (formData: IWareHouseManager) => {
    await updateWareHouseManager(formData, id);
    router.push('/admin/wareHouseManager');
  };

  let fields: IFieldsProps = {
    title: 'Update WareHouseManager ',
    disabled: false,
    fields: [
      {label: "WareHouseManager First Name", name: "wareHouseManagerFirstName", inputType: "text", placeholder: "WareHouseManager First Name"},
      {label: "WareHouseManager last Name", name: "wareHouseManagerLastName", inputType: "text", placeholder: "WareHouseManager Last Name"},
      {label: "WareHouseManager Email", name: "wareHouseManagerEmail", inputType: "text", placeholder: "WareHouseManager Email"},
      {label: "WareHouseManager Phone Number", name: "wareHouseManagerPhoneNumber", inputType: "text", placeholder: "WareHouseManager Phone Number"},
      {label: "UserName", name: "userName", inputType: "text", placeholder: "UserName"},
      {label: "Gender", name: "gender", inputType: "text", placeholder: "Gender"},
      {label: "Password", name: "password", inputType: "password", placeholder: "Password"},
      {label: "Position Title", name: "positionTitle", inputType: "text", placeholder: "Position Title"},
      {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
      {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
    ],
    dropDownLists: [
      {label: "Inventory", name: "inventoryId", placeholder: "Inventory", value: "id", displayName:"inventoryName", data: inventory },
    ],
    heading: 'Update WareHouseManager',
    data: WareHouseManager,
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

export default WareHouseManagerUpdateForm;