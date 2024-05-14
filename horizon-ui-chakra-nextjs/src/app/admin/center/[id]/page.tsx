import CenterDetails from "components/center/details/CenterDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <CenterDetails id={params.id}></CenterDetails>
};
export default Details;