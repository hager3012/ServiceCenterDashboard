
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IProjectCategory, IProjectCategoryList } from 'types/project-category';
import { getByIdProjectCategory, updateProjectCategory } from 'libs/endpoints/project-category';

const ProjectCategoryUpdateForm = ({ id }: { id: string }) => {
  const [ProjectCategory, setProjectCategory] = useState<IProjectCategoryList>();

  const router = useRouter();

  const fetchProjectCategory = async () => {
    setProjectCategory(await getByIdProjectCategory(id));
  };

  

  useEffect(() => {
    fetchProjectCategory();
}, [])

  const handleSubmit = async (formData: IProjectCategory) => {
    await updateProjectCategory(formData, id);
    router.push('/admin/project-category');
  };

  let fields: IFieldsProps = {
    title: 'Update Project Category ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
    ],
   
    heading: 'Update Project Category',
    data: ProjectCategory,
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

export default ProjectCategoryUpdateForm;