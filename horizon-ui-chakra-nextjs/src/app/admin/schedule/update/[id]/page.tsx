import UpdateSchedule from "components/schedule/update/UpdateSchedule"

const Update = ({params}: {params: {id: string}}) => {
    return <UpdateSchedule id={params.id}></UpdateSchedule>
}

export default Update;