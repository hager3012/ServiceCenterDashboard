import CityDetails from "components/city/details/CityDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <CityDetails id={params.id}></CityDetails>
};
export default Details;
