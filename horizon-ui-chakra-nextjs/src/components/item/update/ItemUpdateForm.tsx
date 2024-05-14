'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { GetCategory } from 'libs/endpoints/item-category';
import { IItemList, IUpdateItem } from 'types/Item';
import { GetByIdItem, UpdateItem } from 'libs/endpoints/item';

const ItemUpdateForm = ({ id }: { id: string }) => {
  const [item, setItem] = useState<IItemList>();
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const fetchItem = async () => {
    setItem(await GetByIdItem(id));
  };

  const fetchCategories = async () => {
    let categories = await GetCategory();
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
    fetchItem();
}, [])

  const handleSubmit = async (formData: IUpdateItem) => {
    await UpdateItem(formData, id);
    router.push('/admin/item');
  };

  let fields: IFieldsProps = {
    title: 'Item Details',
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
    heading: 'Update Item',
    data: item,
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

export default ItemUpdateForm;