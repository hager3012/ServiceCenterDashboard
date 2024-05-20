import RatingServiceDetails from "components/ratingService/details/RatingServiceDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <RatingServiceDetails id={params.id}></RatingServiceDetails>
};
export default Details;