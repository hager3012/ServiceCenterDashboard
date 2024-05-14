import ItemUpdateForm from "components/item/update/ItemUpdateForm"

const Update = ({params}: {params: {id: string}}) => {
    return <ItemUpdateForm id={params.id}></ItemUpdateForm>
}

export default Update;