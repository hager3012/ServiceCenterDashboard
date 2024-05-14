import OfferDetails from "components/offer/details/OfferDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <OfferDetails id={params.id}></OfferDetails>
};
export default Details;