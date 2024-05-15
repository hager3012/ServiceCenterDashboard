
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IProductList } from 'types/Product';
import { useRouter } from 'next/navigation';
import { getByIdProduct } from 'libs/endpoints/product';

const ProductDetails = ({ id }: { id: string }) => {
  const [Product, setProduct] = useState<IProductList>();
 
  const router = useRouter();

  const fetchProduct = async () => {
    setProduct(await getByIdProduct(id));
  };

 
  useEffect(() => {
    fetchProduct();
   }, [])

  const handleSubmit = async (formData: IProductList) => {
    router.push('/admin/product');
  };

  let fields: IFieldsProps = {
    title: 'Product Details',
    disabled: true,
    fields: [
        {label: "Name", name: "productName", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "productDescription", inputType: "text", placeholder: "Description"},
        {label: "Price", name: "productPrice", inputType: "text", placeholder: "Price"},
        {label: "Category", name: "categoryName", inputType: "text", placeholder: "Category"},
        {label: "Brand", name: "productBrandName", inputType: "text", placeholder: "Brand"},
    ],
    heading: 'Back to Products',
    data: Product,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchProduct();
  }, []);

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




export default ProductDetails;
