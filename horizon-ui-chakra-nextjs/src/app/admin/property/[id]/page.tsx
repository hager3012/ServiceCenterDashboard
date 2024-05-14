import PropertyDetails from "components/property/details/PropertyDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <PropertyDetails id={params.id}></PropertyDetails>
};
export default Details;