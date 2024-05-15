import CustomerDetails from "components/customer/details/CustomerDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <CustomerDetails id={params.id}></CustomerDetails>
};
export default Details;