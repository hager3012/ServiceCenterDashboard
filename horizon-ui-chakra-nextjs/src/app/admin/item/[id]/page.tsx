import ItemDetails from "components/item/details/ItemDetails";

const Details = ({params}: {params: {id: string}}) => {
    return <ItemDetails id={params.id}></ItemDetails>
}

export default Details;