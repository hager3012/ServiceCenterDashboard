import UpdateClient from './../../../../../components/client/update/UpdateClient';

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateClient id={params.id}/>
};
export default update;