import UpdateFloorPlan from "components/floor-plan/update/UpdateFloorPlan";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateFloorPlan id={params.id}/>
};
export default update;