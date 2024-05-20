import UpdateOverview from "components/overview/update/UpdateOverview";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateOverview id={params.id}/>
};
export default update;