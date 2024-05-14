import InventoryUpdateForm from "components/inventory/update/InventoryUpdateForm";


const Update = ({params}: {params: {id: string}}) => {
    return <InventoryUpdateForm id={params.id}></InventoryUpdateForm>
}

export default Update;