'use client'
import React, {useState, useEffect } from "react";
import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import { useRouter } from 'next/navigation';
import { addProject, getProject } from "libs/endpoints/project";
import { getProjectCategory } from "libs/endpoints/project-category";
import { getCity } from "libs/endpoints/city";
import { getDeveloper } from "libs/endpoints/developer";
import { IProject, Image } from "types/project";

const AddProject = () => {
    const [ProjectCategory, setProjectCategory] = useState([]);
    const [ProjectCity, setProjectCity] = useState([]);
    const [ProjectDeveloper, setProjectDeveloper] = useState([]);
    const router = useRouter();

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

        await addProject(project);
        router.push("/admin/project");
    }

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
        onSubmit: handleSubmit,
       
      }

      useEffect(() => {
        fetchProjectCategorys();
        fetchProjectCitys();
        fetchProjectDeveloperss();
    },[]);

      return (
        <CompactForm
        title={fields.title}
        disabled={fields.disabled}
        fields={fields.fields} 
        heading={fields.heading}
        data={fields.data}
        dropDownLists={fields.dropDownLists}
        onSubmit={handleSubmit}>
        </CompactForm>
      
    )

}

export default AddProject;
