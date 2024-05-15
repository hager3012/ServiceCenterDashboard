import RoomDetails from "components/room/details/RoomDetails";


const Details = ({ params }: { params: { id: string } }) => {
  return <RoomDetails id={params.id}/>
};
export default Details;
