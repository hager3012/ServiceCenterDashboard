'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { GetItem } from 'libs/endpoints/item';
import { AddOrder } from 'libs/endpoints/order';
import { IInsertOrder } from 'types/Order';

const OrderAddForm = () => {

  const [items, setItems] = useState([]);

  const router = useRouter();

  const fetchItem = async () => {
    let items = await GetItem();
    setItems(items);
  }

  useEffect(() => {
    fetchItem();
}, [])

  const handleSubmit = async (formData: any) => {
    formData.orderDate = "2024-04-05";
    formData.orderStatus = "Pending";
    formData.itemOrders = [
      {
        itemId: formData.itemId,
        quantity: formData.quantity
      }
    ]
    console.log(formData)
    await AddOrder(formData);
    router.push('/admin/order');
  };

  let fields: IFieldsProps = {
    title: 'Create Order',
    disabled: false,
    fields: [
      { label: 'Order From', name: 'from', inputType: 'text', placeholder: 'Order From' },
      { label: 'Order Arrival Date', name: 'orderArrivalDate', inputType: 'date', placeholder: 'Order Arrival Date' },
      { label: 'Quantity', name: 'quantity', inputType: 'number', placeholder: 'Quantity' }
    ],
    dropDownList: {label: "Items", name: "itemId", placeholder: "Item", value: "id", displayName: "name", data: items},
    heading: 'Place Order',
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownList={fields.dropDownList}
      heading={fields.heading}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default OrderAddForm;