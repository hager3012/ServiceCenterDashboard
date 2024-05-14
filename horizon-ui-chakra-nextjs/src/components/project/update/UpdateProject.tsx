
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IProject, IProjectList, Image } from 'types/project';
import { getByIdProject, updateProject } from 'libs/endpoints/project';
import { getProjectCategory } from 'libs/endpoints/project-category';
import { getCity } from 'libs/endpoints/city';
import { getDeveloper } from 'libs/endpoints/developer';

const ProjectUpdateForm = ({ id }: { id: string }) => {
  const [Project, setProject] = useState<IProjectList>();
  const [ProjectCategory, setProjectCategory] = useState([]);
  const [ProjectCity, setProjectCity] = useState([]);
  const [ProjectDeveloper, setProjectDeveloper] = useState([]);
  const router = useRouter();

  const fetchProject = async () => {
    setProject(await getByIdProject(id));
  };

  const fetchProjectCategorys = async () => {
        let ProjectCategorys = await getProjectCategory();
        setProjectCategory(ProjectCategorys);
    }

  const fetchProjectCitys = async () => {
        let ProjectCategorys = await getCity();
        setProjectCity(ProjectCategorys);
    }

  const fetchProjectDeveloperss = async () => {
        let ProjectCategorys = await getDeveloper();
        setProjectDeveloper(ProjectCategorys);
    }

  const handleSubmit = async (formData: any) => {
    const imagesUrls = formData.images ? formData.images.split(",") : [];

    const images: Image[] = imagesUrls.map((url: any) => ({
        imageUrl: url
    }));

    const project: IProject = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: {
            name: formData.locationName,
            address: formData.locationAddress,
            latitude: formData.locationLatitude,
            longitude: formData.locationLongitude
        },
        images: images,
        cityId: formData.cityId,
        developerId: formData.developerId,
        projectCategoryId: formData.projectCategoryId
    }

    await updateProject(project, id);
    router.push('/admin/project');
  };

let fields: IFieldsProps = {
    title: "Add ProjectCategory",
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
        {label: "Location Name", name: "locationName", inputType: "text", placeholder: "Location Name"},
        {label: "Location Address", name: "locationAddress", inputType: "text", placeholder: "Location Address"},
        {label: "Location Latitude", name: "locationLatitude", inputType: "number", placeholder: "Location Latitude"},
        {label: "Location Longitude", name: "locationLongitude", inputType: "number", placeholder: "Location Longitude"},
        {label: "Images", name: "images", inputType: "text", placeholder: "Images (splitted by ,)"}
    ],
    dropDownLists: [
        {label: "Project Category Name", name: "projectCategoryId", displayName: "name", placeholder: "Project Category Name", value: "id", data: ProjectCategory},
        {label: "Project City", name: "cityId", displayName: "name", placeholder: "Project City", value: "id", data: ProjectCity},
        {label: "Project Developer Name", name: "developerId", displayName: "name", placeholder: "Project Developer Name", value: "id", data: ProjectDeveloper},
    ],
    heading: "Create ProjectCategory",
    data: Project,
    onSubmit: handleSubmit,
   
  }

  useEffect(() => {
    fetchProjectCategorys();
    fetchProjectCitys();
    fetchProjectDeveloperss();
    fetchProject();
},[]);

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

export default ProjectUpdateForm;