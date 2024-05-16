import UpdateService from "components/service/update/UpdateService";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateService id={params.id}/>
};
export default update;