import UpdateServicePackage from "components/servicePackage/update/UpdateServicePackage";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateServicePackage id={params.id}/>
};
export default update;