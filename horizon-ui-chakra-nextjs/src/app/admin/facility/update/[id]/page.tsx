import UpdateFacility from "components/facility/update/UpdateFacility";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateFacility id={params.id}/>
};
export default update;