
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IProduct, IProductById, IProductList } from 'types/Product';
import { getByIdProduct, updateProduct } from 'libs/endpoints/product';
import { getProductCategory } from 'libs/endpoints/product-category';

const ProductUpdateForm = ({ id }: { id: number }) => {
  const [Product, setProduct] = useState<IProductById>();
  const [Category, setCategory] = useState([]);
  const router = useRouter();

  const fetchProduct = async () => {
    setProduct(await getByIdProduct(id));
  };

    const fetchCategories = async () => {
        let Category = await getProductCategory();
        setCategory(Category);
    }


    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [])

  const handleSubmit = async (formData: IProduct) => {
    await updateProduct(formData, id);
    router.push('/admin/product');
  };

  let fields: IFieldsProps = {
    title: 'Update Product ',
    disabled: false,
    fields: [
        {label: "Name", name: "productName", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "productDescription", inputType: "text", placeholder: "Description"},
        {label: "Price", name: "productPrice", inputType: "number", placeholder: "Price"},
        {label: "Stock", name: "productStock", inputType: "number", placeholder: "Stock"}

    ],
    dropDownLists:[
      {label: "Category", name: "productCategoryId", placeholder: "Category", value: "id", displayName: "categoryName", data: Category},
   ],
    heading: 'Update Product',
    data: Product,
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

export default ProductUpdateForm;