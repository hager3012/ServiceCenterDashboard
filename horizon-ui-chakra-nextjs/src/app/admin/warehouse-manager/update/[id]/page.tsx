import WareHouseManagerUpdateForm from "components/warehouse-manager/update/UpdateWareHouseManagerr";


const update = ({ params }: { params: { id: string } }) => {
  return <WareHouseManagerUpdateForm id={params.id}/>
};
export default update;