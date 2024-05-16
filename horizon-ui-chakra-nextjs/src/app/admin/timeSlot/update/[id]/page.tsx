import UpdateTimeSlot from "components/timeSlot/update/UpdateTimeSlot";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateTimeSlot id={params.id}/>
};
export default update;