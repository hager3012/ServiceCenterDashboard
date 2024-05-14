import UnitDetails from "components/unit/details/UnitDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <UnitDetails id={params.id}></UnitDetails>
};
export default Details;