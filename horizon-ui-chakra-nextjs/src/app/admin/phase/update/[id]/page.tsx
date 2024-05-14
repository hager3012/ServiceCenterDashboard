import UpdatePhase from "components/phase/update/UpdatePhase";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdatePhase id={params.id}/>
};
export default update;