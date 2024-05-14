import ProductCategoryDetails from "components/product-category/details/ProductCategoryDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ProductCategoryDetails id={params.id}></ProductCategoryDetails>
};
export default Details;