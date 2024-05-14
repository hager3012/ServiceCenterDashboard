import UpdateAppointment  from "components/appointment/update/UpdateAppointment"

const update = ({ params }: { params: { id: string } }) => {
  return < UpdateAppointment id={params.id}/>
};
export default update;
