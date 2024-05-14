import UpdatePaymentPlan from "components/payment-plan/update/UpdatePaymentPlan";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdatePaymentPlan id={params.id}/>
};
export default update;