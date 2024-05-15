'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IRoom, IRoomList } from 'types/Room';
import { GetByIdRoom, UpdateRoom } from 'libs/endpoints/room';
import { getCenter } from 'libs/endpoints/center';

const RoomUpdateForm = ({ id }: { id: string }) => {
  const [Room, setRoom] = useState<IRoom>({});
    const [centers, setCenters] = useState([]);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    
    useEffect(() => {
        const fetchRoom = async () => {
            const room = await GetByIdRoom(id)
            let roomToUpdate: IRoom = {
                roomNumber: room.roomNumber,
                availability: room.availability,
                centerId: room.centerId,
            };
            setRoom(roomToUpdate);
        }
        fetchRoom();

        const fetchCenter = async () => {
          let centers = await getCenter();
          setCenters(centers);
          console.log("from page", centers);
        }
        fetchCenter();
    
    }, []);


      const handleSubmit = async (formData:any) => {
        formData.availability=true;
        setMessage(await UpdateRoom(formData,id));
        router.push("/admin/room");
    }
    

    let fields: IFieldsProps = {
      title: "Update Room",
      disabled: false,
      fields: [
        {label: "Room Number", name: "roomNumber", inputType: "number", placeholder: "Room Number"},
      ],
      dropDownLists: [
        {label: "Center", name: "centerId", placeholder: "Center", value: "id", displayName:"centerName", data: centers},
      ],
      data:Room,
      heading: "Update Room",
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

export default RoomUpdateForm;