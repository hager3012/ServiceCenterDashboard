'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { AddRoom } from 'libs/endpoints/room';
import { getCenter } from 'libs/endpoints/center';

const RoomAddForm = () => {

  const [centers, setCenters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCenter = async () => {
      let centers = await getCenter();
      setCenters(centers);
      console.log("from page", centers);
    }
    fetchCenter();
  },[]);

    const handleSubmit = async (formData: any) => {
      formData.availability=true;
      await AddRoom(formData);
      router.push("/admin/room");

  }

  let fields: IFieldsProps = {
    title: "Add Room",
    disabled: false,
    fields: [
      {label: "Room Number", name: "roomNumber", inputType: "number", placeholder: "Room Number"},
    ],
    dropDownLists: [
      {label: "Center", name: "centerId", placeholder: "Center", value: "id", displayName:"centerName", data: centers},
    ],
    heading: "Create Room",
    onSubmit: handleSubmit,
    
  }

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
    
  );
};

export default RoomAddForm;