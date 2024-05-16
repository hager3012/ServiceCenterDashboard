import FeedbackDetails from "components/feedback/details/FeedbackDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <FeedbackDetails id={params.id}></FeedbackDetails>
};
export default Details;