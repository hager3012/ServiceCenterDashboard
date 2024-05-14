'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { GetCategory } from 'libs/endpoints/item-category';
import { IUpdateItem } from 'types/Item';
import { AddItem } from 'libs/endpoints/item';

const ItemAddForm = () => {

  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const fetchCategory = async () => {
    let categories = await GetCategory();
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategory();
}, [])

  const handleSubmit = async (formData: IUpdateItem) => {
    await AddItem(formData);
    router.push('/admin/item');
  };

  let fields: IFieldsProps = {
    title: 'Create Item',
    disabled: false,
    fields: [
      { label: 'Item Name ', name: 'itemName', inputType: 'text', placeholder: 'Item Name' },
      { label: 'Item Description', name: 'itemDescription', inputType: 'text', placeholder: 'Item Description' },
      { label: 'Item stock', name: 'itemStock', inputType: 'number', placeholder: 'Item stock' },
      { label: 'Item price', name: 'itemPrice', inputType: 'number', placeholder: 'Item price' },
    ],
    dropDownLists:[
       {label: "Categories", name: "categoryId", placeholder: "Category", value: "id", displayName: "categoryName", data: categories},
    ],
    heading: 'Add Item',
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

export default ItemAddForm;