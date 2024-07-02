
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IProductById, IProductList } from 'types/Product';
import { useRouter } from 'next/navigation';
import { getByIdProduct } from 'libs/endpoints/product';

const ProductDetails = ({ id }: { id: number }) => {
  const [Product, setProduct] = useState<IProductById>();
 
  const router = useRouter();

  const fetchProduct = async () => {
    setProduct(await getByIdProduct(id));
  };


  const handleSubmit = async (formData: IProductList) => {
    router.push('/admin/product');
  };

  let fields: IFieldsProps = {
    title: 'Product Details',
    disabled: true,
    fields: [
        {label: "Name", name: "productName", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "productDescription", inputType: "text", placeholder: "Description"},
        {label: "Price", name: "productPrice", inputType: "number", placeholder: "Price"},
        {label: "Stock", name: "productStock", inputType: "number", placeholder: "Stock"},
        {label: "Category", name: "categoryName", inputType: "text", placeholder: "Category"},
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
