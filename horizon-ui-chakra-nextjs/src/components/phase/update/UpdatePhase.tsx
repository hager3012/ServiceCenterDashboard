
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IPhase, IPhaseList } from 'types/Phase';
import { getByIdPhase, updatePhase } from 'libs/endpoints/phase';
import { getProject } from 'libs/endpoints/project';

const PhaseUpdateForm = ({ id }: { id: string }) => {
  const [Phase, setPhase] = useState<IPhaseList>();
  const [Projects, setProjects] = useState([]);
  const router = useRouter();

  const fetchPhase = async () => {
    setPhase(await getByIdPhase(id));
  };

  const fetchProjects = async () => {
    let Project = await getProject();
    setProjects(Project);
  }

  useEffect(() => {
    fetchPhase();
    fetchProjects();
}, [])

  const handleSubmit = async (formData: IPhase) => {
    await updatePhase(formData, id);
    router.push('/admin/phase');
  };

  let fields: IFieldsProps = {
    title: 'Update Phase ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"}
    ],
    dropDownLists: [
      {label: "Project Name", name: "projectId", displayName: "name", placeholder: "Project Name", value: "id", data: Projects},
    ],
    heading: 'Update Phase',
    data: Phase,
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

export default PhaseUpdateForm;