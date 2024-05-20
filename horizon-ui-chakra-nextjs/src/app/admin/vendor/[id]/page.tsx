import VendorDetails from "components/vendor/details/VendorDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <VendorDetails id={params.id}></VendorDetails>
};
export default Details;