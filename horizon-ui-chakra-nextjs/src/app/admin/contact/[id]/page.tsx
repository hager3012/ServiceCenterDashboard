import ContactDetails from "components/contact/details/ContactDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <ContactDetails id={params.id}></ContactDetails>
};
export default Details;