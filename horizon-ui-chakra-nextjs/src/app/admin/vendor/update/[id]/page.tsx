import UpdateVendor from "components/vendor/update/UpdateVendor";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateVendor id={params.id}/>
};
export default update;