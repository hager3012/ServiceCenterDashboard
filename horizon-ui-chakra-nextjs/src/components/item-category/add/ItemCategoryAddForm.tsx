'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ICategory } from 'types/ItemCategory';
import { AddCategory, GetInventories } from 'libs/endpoints/item-category';

const ItemCategoryAddForm = () => {

  const [inventories, setInventories] = useState([]);

  const router = useRouter();

  const fetchInventory = async () => {
    let inventories = await GetInventories();
    setInventories(inventories);
  }

  useEffect(() => {
    fetchInventory();
}, [])

  const handleSubmit = async (formData: ICategory) => {
    await AddCategory(formData);
    router.push('/admin/item-category');
  };

  let fields: IFieldsProps = {
    title: 'Item Category Details',
    disabled: false,
    fields: [
      { label: 'Category Name ', name: 'categoryName', inputType: 'text', placeholder: 'Category Name' },
      { label: 'Category Reference Number', name: 'referenceNumber', inputType: 'number', placeholder: 'Reference Number' },
    ],
    dropDownLists:[
       {label: "Inventories", name: "inventoryId", placeholder: "Inventory", value: "id", displayName: "inventoryName", data: inventories},
    ],
    heading: 'Update Item Category',
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

export default ItemCategoryAddForm;