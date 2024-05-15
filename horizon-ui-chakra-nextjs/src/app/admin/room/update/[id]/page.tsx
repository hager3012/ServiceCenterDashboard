import RoomUpdateForm  from 'components/room/update/UpdateRoom'

const update = ({ params }: { params: { id: string } }) => {
  return <RoomUpdateForm id={params.id}/>
};
export default update;