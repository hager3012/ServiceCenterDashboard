import UpdateProduct from "components/product/update/UpdateProduct";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProduct id={params.id}/>
};
export default update;