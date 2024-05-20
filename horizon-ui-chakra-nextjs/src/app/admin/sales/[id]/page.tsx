import SalesDetails from "components/sales/details/SalesDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <SalesDetails id={params.id}></SalesDetails>
};
export default Details;