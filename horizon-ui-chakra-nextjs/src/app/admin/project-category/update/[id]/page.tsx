import UpdateProjectCategory from "components/project-category/update/UpdateProjectCategory";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProjectCategory id={params.id}/>
};
export default update;