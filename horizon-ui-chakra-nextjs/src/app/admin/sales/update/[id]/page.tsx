import UpdateSales from "components/sales/update/UpdateSales";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateSales id={params.id}/>
};
export default update;