import FacilityDetails from "components/facility/details/FacilityDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <FacilityDetails id={params.id}></FacilityDetails>
};
export default Details;