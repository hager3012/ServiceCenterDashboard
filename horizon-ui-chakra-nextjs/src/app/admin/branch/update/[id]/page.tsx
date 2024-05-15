import UpdateBranch from "components/branch/update/UpdateBranch";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateBranch id={params.id}/>
};
export default update;