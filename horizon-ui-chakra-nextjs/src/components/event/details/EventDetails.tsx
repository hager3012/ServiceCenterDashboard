
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import {  IEventList } from 'types/Event';
import { useRouter } from 'next/navigation';
import { getByIdEvent } from 'libs/endpoints/event';

const EventDetails = ({ id }: { id: string }) => {
  const [Event, setEvent] = useState<IEventList>();
 
  const router = useRouter();

  const fetchEvent = async () => {
    setEvent(await getByIdEvent(id));
  };

 
  useEffect(() => {
    fetchEvent();
   }, [])

  const handleSubmit = async (formData: IEventList) => {
    router.push('/admin/event');
  };

  let fields: IFieldsProps = {
    title: 'Event Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Date", name: "date", inputType: "date", placeholder: "Event Date"},
        {label: "Location", name: "location", inputType: "text", placeholder: "Event Location Address"}
    ],
    heading: 'Back to Events',
    data: Event,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};




export default EventDetails;
