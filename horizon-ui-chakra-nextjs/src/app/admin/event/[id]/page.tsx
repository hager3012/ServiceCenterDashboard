import EventDetails from "components/event/details/EventDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <EventDetails id={params.id}></EventDetails>
};
export default Details;