import ScheduleDetails from "components/schedule/details/ScheduleDetails";

const Details = ({params}: {params: {id: string}}) => {
    return <ScheduleDetails id={params.id}></ScheduleDetails>
}

export default Details;