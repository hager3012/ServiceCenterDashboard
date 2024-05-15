import UpdateComplaint from "components/complaint/update/UpdateComplaint";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateComplaint id={params.id}/>
};
export default update;