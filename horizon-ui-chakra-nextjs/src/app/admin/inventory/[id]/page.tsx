import InventoryDetails from "components/inventory/details/InventoryDetails";



const Details = ({params}: {params: {id: string}}) => {
    return <InventoryDetails id={params.id}></InventoryDetails>
}

export default Details;