import UpdateProject from "components/project/update/UpdateProject";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProject id={params.id}/>
};
export default update;