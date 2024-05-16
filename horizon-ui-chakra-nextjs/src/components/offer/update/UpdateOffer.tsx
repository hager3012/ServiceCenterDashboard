
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IOffer, IOfferList } from 'types/Offer';
import { getByIdOffer, updateOffer } from 'libs/endpoints/offer';
import { getProduct } from 'libs/endpoints/product';

const OfferUpdateForm = ({ id }: { id: string }) => {
  const [Offer, setOffer] = useState<IOfferList>();
  const [Products, setProducts] = useState([]);
  const router = useRouter();

  const fetchOffer = async () => {
    setOffer(await getByIdOffer(id));
  };

  const fetchProducts = async () => {
    let Product = await getProduct();
    setProducts(Product);
  }

  useEffect(() => {
    fetchOffer();
    fetchProducts();
}, [])

  const handleSubmit = async (formData: IOffer) => {
    await updateOffer(formData, id);
    router.push('/admin/offer');
  };

  let fields: IFieldsProps = {
    title: 'Update Offer ',
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
    heading: 'Update Offer',
    data: Offer,
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

export default OfferUpdateForm;