import WareHouseManagerDetails from "components/warehouse-manager/details/WareHouseManagerDetails";


const Details = ({ params }: { params: { id: string } }) => {
  return <WareHouseManagerDetails id={params.id}></WareHouseManagerDetails>
};
export default Details;