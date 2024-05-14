import UpdateCenter from "components/center/update/UpdateCenter";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateCenter id={params.id}/>
};
export default update;