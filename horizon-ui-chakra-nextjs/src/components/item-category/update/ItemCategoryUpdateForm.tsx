'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ICategory, ICategoryList } from 'types/ItemCategory';
import { GetByIdCategory, GetInventories, UpdateCategory } from 'libs/endpoints/item-category';

const ItemCategoryUpdateForm = ({ id }: { id: string }) => {
  const [category, setCategory] = useState<ICategoryList>();
  const [inventories, setInventories] = useState([]);

  const router = useRouter();

  const fetchCategory = async () => {
    setCategory(await GetByIdCategory(id));
  };

  const fetchInventory = async () => {
    let inventories = await GetInventories();
    setInventories(inventories);
  }

  useEffect(() => {
    fetchCategory();
    fetchInventory();
}, [])

  const handleSubmit = async (formData: ICategory) => {
    console.log("form data", formData);
    
    await UpdateCategory(formData, id);
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
    data: category,
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

export default ItemCategoryUpdateForm;