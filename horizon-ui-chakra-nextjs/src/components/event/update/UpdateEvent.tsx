
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IEvent, IEventList } from 'types/Event';
import { getByIdEvent, updateEvent } from 'libs/endpoints/event';
import { getProject } from 'libs/endpoints/project';

const EventUpdateForm = ({ id }: { id: string }) => {
  const [Event, setEvent] = useState<IEventList>();
  const [Projects, setProjects] = useState([]);
  const router = useRouter();

  const fetchEvent = async () => {
    setEvent(await getByIdEvent(id));
  };

  const fetchProjects = async () => {
    let Project = await getProject();
    setProjects(Project);
  }

  useEffect(() => {
    fetchEvent();
    fetchProjects();
}, [])

  const handleSubmit = async (formData: IEvent) => {
    await updateEvent(formData, id);
    router.push('/admin/event');
  };

  let fields: IFieldsProps = {
    title: 'Update Event ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Date", name: "date", inputType: "date", placeholder: "Event Date"},
        {label: "Location", name: "location", inputType: "text", placeholder: "Event Location Address"}
    ],
    dropDownLists: [
      {label: "Project Name", name: "projectId", displayName: "name", placeholder: "Project Name", value: "id", data: Projects},
    ],
    heading: 'Update Event',
    data: Event,
    onSubmit: handleSubmit,
  };

  return (
    <CompactForm
      title={fields.title}
      disabled={fields.disabled}
      fields={fields.fields}
      dropDownLists={fields.dropDownLists}
      heading={fields.heading}
      data={fields.data}
      onSubmit={handleSubmit}
    ></CompactForm>
  );
};

export default EventUpdateForm;