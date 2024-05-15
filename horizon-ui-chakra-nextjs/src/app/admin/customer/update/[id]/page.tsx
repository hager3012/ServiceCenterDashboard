import UpdateCustomer from "components/customer/update/UpdateCustomer";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateCustomer id={params.id}/>
};
export default update;