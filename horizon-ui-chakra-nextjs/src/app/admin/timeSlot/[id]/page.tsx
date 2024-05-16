import TimeSlotDetails from "components/timeSlot/details/TimeSlotDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <TimeSlotDetails id={params.id}></TimeSlotDetails>
};
export default Details;