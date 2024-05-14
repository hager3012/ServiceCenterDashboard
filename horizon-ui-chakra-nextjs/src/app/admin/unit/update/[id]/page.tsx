import UpdateUnit from "components/unit/update/UpdateUnit";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateUnit id={params.id}/>
};
export default update;