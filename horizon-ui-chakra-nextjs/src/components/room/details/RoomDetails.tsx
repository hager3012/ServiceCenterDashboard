"use client";

import CompactForm, { IFieldsProps } from "components/common/compact-form/CompactForm";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { IRoom, IRoomList } from "types/Room";
import { GetByIdRoom } from "libs/endpoints/room";
export default function RoomDetails({ id }: { id: string }) {
  const [room, setRoom] = useState<IRoomList>({});
  const router = useRouter();

  const fetchRoom = async () => {
    setRoom(await GetByIdRoom(id));
  }

  useEffect(() => {
      fetchRoom();
  }, [])

  const handleSubmit = async (formData: IRoom) => {
    router.push("/admin/room");
  }

  let fields: IFieldsProps = {
    title:"Room Details",
      disabled: true,
      fields: [
        {label: "Room Number", name: "roomNumber", inputType: "number", placeholder: "Room Number"},
        {label: "Center", name: "centerName", inputType: "text", placeholder: "Center"},
      ],
    heading: "Back to Rooms",
    data:room,
    onSubmit: handleSubmit,
    
  }

  return (
    <CompactForm
    title={fields.title}
    disabled={fields.disabled}
    fields={fields.fields} 
    heading={fields.heading}
    data={fields.data}
    onSubmit={handleSubmit}>
    </CompactForm>
  )
}