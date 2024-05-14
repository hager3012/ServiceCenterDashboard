import { AgentDetails } from "components/agent/details";


const Details = ({ params }: { params: { id: string } }) => {
  return <AgentDetails id={params.id}/>
};
export default Details;