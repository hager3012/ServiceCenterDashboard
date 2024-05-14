'use client'
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";

import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { IInventory, IInventoryList } from "types/Inventory";
import { getByIdInventory } from "libs/endpoints/inventory";

const InventoryDetails = ({ id }: { id: string }) => {
    const [Inventory, setInventory] = useState({});
    const router = useRouter();

    const fetchInventory = async () => {
        setInventory(await getByIdInventory(id));
    }

    useEffect(() => {
        fetchInventory();
    }, [])

    const handleSubmit = async (formData: IInventory) => {
      router.push("/admin/inventory");
    }

    let fields: IFieldsProps = {
      title:"Inventory Details",
        disabled: true,
      fields: [
        {label: "Id ", name: "id", inputType: "text", placeholder: "id"},
        {label: "Inventory Name", name: "inventoryName", inputType: "text", placeholder: "Name"},
        {label: "Inventory Location", name: "inventoryLocation", inputType: "text", placeholder: "Inventory Location"},
        {label: "Inventory Capacity", name: "inventoryCapacity", inputType: "Number", placeholder: "Inventory Capacity"},
      ],
      heading: "Back to Inventories",
      data:Inventory,
      onSubmit: handleSubmit,
      
    }

    return (
      <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields} 
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}>
      </CompactForm>
    )
}
export default InventoryDetails;