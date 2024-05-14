import ProjectCategoryDetails from "components/project-category/details/ProjectCategoryDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ProjectCategoryDetails id={params.id}></ProjectCategoryDetails>
};
export default Details;