import UpdateProduct from "components/product/update/UpdateProduct";

const update = ({ params }: { params: { id: number } }) => {
  return <UpdateProduct id={params.id}/>
};
export default update;