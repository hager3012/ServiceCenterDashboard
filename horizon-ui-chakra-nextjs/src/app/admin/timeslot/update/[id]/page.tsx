import UpdateTimeslot  from "components/timeslot/update/UpdateTimeslot"

const update = ({ params }: { params: { id: string } }) => {
  return < UpdateTimeslot id={params.id}/>
};
export default update;
