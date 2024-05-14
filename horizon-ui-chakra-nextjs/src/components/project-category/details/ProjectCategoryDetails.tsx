
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IProjectCategoryList } from 'types/project-category';
import { getByIdProjectCategory } from 'libs/endpoints/project-category';

const ProjectCategoryDetails = ({ id }: { id: string }) => {
  const [ProjectCategory, setProjectCategory] = useState<IProjectCategoryList>();
 
  const router = useRouter();

  const fetchProjectCategory = async () => {
    setProjectCategory(await getByIdProjectCategory(id));
  };

 
  useEffect(() => {
    fetchProjectCategory();
   }, [])

  const handleSubmit = async (formData: IProjectCategoryList) => {
    router.push('/admin/project-category');
  };

  let fields: IFieldsProps = {
    title: 'Project Category Details',
    disabled: true,
    fields: [
      {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
    ],
    heading: 'Back to Project Categorys',
    data: ProjectCategory,
    onSubmit: handleSubmit,
  };


  useEffect(() => {
    fetchProjectCategory();
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




export default ProjectCategoryDetails;
