import PaymentPlanDetails from "components/payment-plan/details/PaymentPlanDetails";

const Details = ({ params }: { params: { id: string } }) => {
  return <PaymentPlanDetails id={params.id}></PaymentPlanDetails>
};
export default Details;