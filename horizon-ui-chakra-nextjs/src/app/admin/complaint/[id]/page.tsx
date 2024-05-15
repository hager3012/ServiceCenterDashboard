import ComplaintDetails from "components/complaint/details/ComplaintDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ComplaintDetails id={params.id}></ComplaintDetails>
};
export default Details;