
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IProductCategoryList } from 'types/ProductCategory';
import { useRouter } from 'next/navigation';
import { getByIdProductCategory } from 'libs/endpoints/product-category';

const ProductCategoryDetails = ({ id }: { id: string }) => {
  const [ProductCategory, setProductCategory] = useState<IProductCategoryList>();
 
  const router = useRouter();

  const fetchProductCategory = async () => {
    setProductCategory(await getByIdProductCategory(id));
  };

 
  useEffect(() => {
    fetchProductCategory();
   }, [])

  const handleSubmit = async (formData: IProductCategoryList) => {
    router.push('/admin/product-category');
  };

  let fields: IFieldsProps = {
    title: 'ProductCategory Details',
    disabled: true,
    fields: [
        {label: "Name", name: "categoryName", inputType: "text", placeholder: "Name"}
        ],
    heading: 'Back to ProductCategorys',
    data: ProductCategory,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchProductCategory();
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




export default ProductCategoryDetails;
