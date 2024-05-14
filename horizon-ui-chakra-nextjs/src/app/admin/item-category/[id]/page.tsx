import ItemCategoryDetails from "components/item-category/details/ItemCategoryDetails";


const Details = ({ params }: { params: { id: string } }) => {
  return <ItemCategoryDetails id={params.id}/>
};
export default Details;