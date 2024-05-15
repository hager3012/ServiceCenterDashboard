import UpdateEmployee from "components/employee/update/UpdateEmployee";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateEmployee id={params.id}/>
};
export default update;