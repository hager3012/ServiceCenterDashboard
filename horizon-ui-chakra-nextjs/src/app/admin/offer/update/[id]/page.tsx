import UpdateOffer from "components/offer/update/UpdateOffer";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateOffer id={params.id}/>
};
export default update;