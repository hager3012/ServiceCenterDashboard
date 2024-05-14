import DeveloperDetails from "components/developer/details/DeveloperDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <DeveloperDetails id={params.id}></DeveloperDetails>
};
export default Details;