import ProjectDetails from "components/project/details/ProjectDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ProjectDetails id={params.id}></ProjectDetails>
};
export default Details;