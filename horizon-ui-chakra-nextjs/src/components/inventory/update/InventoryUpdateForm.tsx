"use client";

import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";

import { useRouter } from 'next/navigation';
import { IInventory } from "types/Inventory";
import { getByIdInventory, updateInventory } from "libs/endpoints/inventory";


const  InventoryUpdateForm = ({ id }: { id: string })  =>{
    const [Inventory, setInventory] = useState({});
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    
    useEffect(() => {
        const fetchInventory = async () => {
            const inventory = await getByIdInventory(id)
          
            setInventory(inventory);
        }
        fetchInventory();
    
    }, []);


      const handleSubmit = async (formData:any) => {
        setMessage(await updateInventory(formData,id));
        router.push("/admin/inventory");
    }
    

    let fields: IFieldsProps = {
      title:"Update Inventory",
      disabled: false,
      fields: [
        {label: "Inventory Name", name: "inventoryName", inputType: "text", placeholder: "Name"  },
        {label: "Inventory Location", name: "inventoryLocation", inputType: "text", placeholder: "Inventory Location"},
        {label: "Inventory Capacity", name: "inventoryCapacity", inputType: "Number", placeholder: "Inventory Capacity"},
      ],
      data:Inventory,
      heading: "Update Inventory",
      onSubmit: handleSubmit,
    }
  
      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        heading={fields.heading}
        data={fields.data}
        dropDownLists={fields.dropDownLists}
        onSubmit={handleSubmit}>
        </CompactForm>
      )
  }
  export default InventoryUpdateForm;
