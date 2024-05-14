import UpdateEvent from "components/event/update/UpdateEvent";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateEvent id={params.id}/>
};
export default update;