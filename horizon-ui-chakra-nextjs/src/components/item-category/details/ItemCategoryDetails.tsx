'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { ICategory, ICategoryList } from 'types/ItemCategory';
import { GetByIdCategory } from 'libs/endpoints/item-category';

const ItemCategoryDetails = ({ id }: { id: string }) => {
  const [category, setCategory] = useState<ICategoryList>();
  const [inventory, setInventory] = useState([]);

  const router = useRouter();

  const fetchCategory = async () => {
    setCategory(await GetByIdCategory(id));
  };

  const fetchInventory = async () => {
    //let inventory = await getInventory();
    setInventory(inventory);
  }

  useEffect(() => {
    fetchCategory();
    fetchInventory();
}, [])

  const handleSubmit = async (formData: ICategory) => {
    router.push('/admin/item-category');
  };

  // Define form fields and data
  let fields: IFieldsProps = {
    title: 'Item Category Details',
    disabled: true,
    fields: [
      { label: 'Category Name ', name: 'categoryName', inputType: 'text', placeholder: 'Category Name' },
      { label: 'Category Reference Number', name: 'referenceNumber', inputType: 'number', placeholder: 'Reference Number' },
    ],
    heading: 'Back to Categories',
    data: category,
    onSubmit: handleSubmit,
  };

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

export default ItemCategoryDetails;