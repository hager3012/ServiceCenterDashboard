import AppointmentDetails  from "components/appointment/details/AppointmentDetails"

const Details = ({ params }: { params: { id: string } }) => {
  return <AppointmentDetails id={params.id}></AppointmentDetails>
};
export default Details;
