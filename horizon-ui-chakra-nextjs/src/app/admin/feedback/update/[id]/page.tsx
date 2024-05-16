import UpdateFeedback from "components/feedback/update/UpdateFeedback";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateFeedback id={params.id}/>
};
export default update;