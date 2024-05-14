import ItemCategoryUpdateForm from "components/item-category/update/ItemCategoryUpdateForm";

const Update = ({ params }: { params: { id: string } }) => {
  return <ItemCategoryUpdateForm id={params.id}/>
};

export default Update;