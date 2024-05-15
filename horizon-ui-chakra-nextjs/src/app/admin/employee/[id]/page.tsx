import EmployeeDetails from "components/employee/details/EmployeeDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <EmployeeDetails id={params.id}></EmployeeDetails>
};
export default Details;