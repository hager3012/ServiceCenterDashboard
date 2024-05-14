
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IProjectList } from 'types/project';
import { getByIdProject } from 'libs/endpoints/project';

const ProjectDetails = ({ id }: { id: string }) => {
  const [Project, setProject] = useState<IProjectList>();
 
  const router = useRouter();

  const fetchProject = async () => {
    setProject(await getByIdProject(id));
  };

 
  useEffect(() => {
    fetchProject();
   }, [])

  const handleSubmit = async (formData: IProjectList) => {
    router.push('/admin/project');
  };

  let fields: IFieldsProps = {
    title: 'Project Details',
    disabled: true,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
    ],
    heading: 'Back to Projects',
    data: Project,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchProject();
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

export default ProjectDetails;
