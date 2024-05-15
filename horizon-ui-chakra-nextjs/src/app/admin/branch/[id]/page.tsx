import BranchDetails from "components/branch/details/BranchDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <BranchDetails id={params.id}></BranchDetails>
};
export default Details;