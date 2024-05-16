import ServiceDetails from "components/service/details/ServiceDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ServiceDetails id={params.id}></ServiceDetails>
};
export default Details;