import UpdateCity from "components/city/update/UpdateCity";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateCity id={params.id}/>
};
export default update;