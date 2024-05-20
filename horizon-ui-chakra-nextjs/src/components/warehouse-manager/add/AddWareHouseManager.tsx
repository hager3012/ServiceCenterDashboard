'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addWareHouseManager } from "libs/endpoints/wareHouseManager";
import { getInventory } from "libs/endpoints/inventory";

const AddWareHouseManager = () => {
    const [inventory, seInventory] = useState([]);
    const router = useRouter();

    const handleSubmit = async (formData: any) => {
        await addWareHouseManager(formData);
        router.push("/admin/wareHouseManager");
    }

    const fetchInventory = async () => {
        let inventorys = await getInventory();
        seInventory(inventorys);
      }

    let fields: IFieldsProps = {
        title: "Add WareHouseManager",
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
        heading: "Create WareHouseManager",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchInventory();
    },[]);

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

export default AddWareHouseManager;
function GeInventory() {
  throw new Error("Function not implemented.");
}

