import PhaseDetails from "components/phase/details/PhaseDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <PhaseDetails id={params.id}></PhaseDetails>
};
export default Details;