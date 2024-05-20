import OverviewDetails from "components/overview/details/OverviewDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <OverviewDetails id={params.id}></OverviewDetails>
};
export default Details;