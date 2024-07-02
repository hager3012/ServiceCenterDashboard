import ProductDetails from "components/product/details/ProductDetails";

const Details = ({ params }: { params: { id: number } }) => {
  return <ProductDetails id={params.id}></ProductDetails>
};
export default Details;