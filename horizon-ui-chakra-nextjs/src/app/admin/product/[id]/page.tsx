import ProductDetails from "components/product/details/ProductDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ProductDetails id={params.id}></ProductDetails>
};
export default Details;