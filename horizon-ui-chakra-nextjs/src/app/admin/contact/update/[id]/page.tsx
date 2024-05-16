import UpdateContact from "components/contact/update/UpdateContact";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateContact id={params.id}/>
};
export default update;