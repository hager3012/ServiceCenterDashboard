import { ClientDetails } from "components/client/details";


const Details = ({ params }: { params: { id: string } }) => {
  return <ClientDetails id={params.id}/>
};
export default Details;