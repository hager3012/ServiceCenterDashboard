import UpdateProperty from "components/property/update/UpdateProperty";

const update = ({ params }: { params: { id: string } }) => {
  return <UpdateProperty id={params.id}/>
};
export default update;