import UpdateProductBrand from "components/product-brand/update/UpdateProductBrand";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProductBrand id={params.id}/>
};
export default update;