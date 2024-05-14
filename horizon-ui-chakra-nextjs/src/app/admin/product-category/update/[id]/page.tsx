import UpdateProductCategory from "components/product-category/update/UpdateProductCategory";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProductCategory id={params.id}/>
};
export default update;