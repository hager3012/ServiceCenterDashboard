import FloorPlanDetails from "components/floor-plan/details/FloorPlanDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <FloorPlanDetails id={params.id}></FloorPlanDetails>
};
export default Details;