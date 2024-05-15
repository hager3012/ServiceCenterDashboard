import UpdateDepartment from "components/department/update/UpdateDepartment";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateDepartment id={params.id}/>
};
export default update;