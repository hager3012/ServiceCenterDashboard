import UpdateDeveloper from "components/developer/update/UpdateDeveloper";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateDeveloper id={params.id}/>
};
export default update;