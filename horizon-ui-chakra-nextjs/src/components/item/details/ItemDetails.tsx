'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { GetByIdItem } from 'libs/endpoints/item';
import { IItemList } from 'types/Item';

const ItemDetails = ({ id }: { id: string }) => {
  const [item, setItem] = useState<IItemList>();

  const router = useRouter();

  const fetchItem = async () => {
    setItem(await GetByIdItem(id));
  };

  useEffect(() => {
    fetchItem();
}, [])

  const handleSubmit = async (formData: IItemList) => {
    router.push('/admin/item');
  };

  let fields: IFieldsProps = {
    title: 'Item Details',
    disabled: true,
    fields: [
      { label: 'Item Name ', name: 'name', inputType: 'text', placeholder: 'Item Name' },
      { label: 'Item Description', name: 'itemDescription', inputType: 'number', placeholder: 'Item Description' },
      { label: 'Item stock', name: 'stock', inputType: 'number', placeholder: 'Item stock' },
      { label: 'Item price', name: 'price', inputType: 'number', placeholder: 'Item price' },
    ],
    heading: 'Back to Items',
    data: item,
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

export default ItemDetails;