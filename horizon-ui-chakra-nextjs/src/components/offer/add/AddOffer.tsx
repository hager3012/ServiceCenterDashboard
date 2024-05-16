'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addOffer, getOffer } from "libs/endpoints/offer";
import { getProduct } from "libs/endpoints/product";

const AddOffer = () => {
    const [Offer, setOffer] = useState([]);
    const [Products, setProducts] = useState([]);
    const router = useRouter();
    const handleSubmit = async (formData: any) => {
        await addOffer(formData);
        router.push("/admin/offer");
    }

    const fetchOffers = async () => {
        let Offers = await getOffer();
        setOffer(Offers);
    }

    const fetchProducts = async () => {
        let Product = await getProduct();
        setProducts(Product);
    }

    let fields: IFieldsProps = {
        title: "Add Offer",
        disabled: false,
        fields: [
            {label: "Name", name: "offerName", inputType: "text", placeholder: "Name"},
            {label: "Description", name: "offerDescription", inputType: "text", placeholder: "Description"},
            {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
            {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
            {label: "Discount", name: "discount", inputType: "number", placeholder: "Discount"},
        ],
        dropDownLists: [
            {label: "Product Name", name: "productId", displayName: "productName", placeholder: "Product Name", value: "id", data: Products},
        ],
        heading: "Create Offer",
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchOffers();
        fetchProducts();
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

export default AddOffer;
