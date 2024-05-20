import UpdateRatingService from "components/ratingService/update/UpdateRatingService";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateRatingService id={params.id}/>
};
export default update;