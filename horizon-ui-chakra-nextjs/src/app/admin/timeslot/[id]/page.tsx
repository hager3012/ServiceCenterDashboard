import TimeslotDetails  from "components/timeslot/details/TimeslotDetails"

const Details = ({ params }: { params: { id: string } }) => {
  return <TimeslotDetails id={params.id}></TimeslotDetails>
};
export default Details;
