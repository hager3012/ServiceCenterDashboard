import DepartmentDetails from "components/department/details/DepartmentDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <DepartmentDetails id={params.id}></DepartmentDetails>
};
export default Details;