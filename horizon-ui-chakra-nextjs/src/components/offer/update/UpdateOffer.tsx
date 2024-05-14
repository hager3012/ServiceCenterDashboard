
'use client';

import { useState, useEffect } from 'react';
import CompactForm, {
  IFieldsProps,
} from 'components/common/compact-form/CompactForm';
import { useRouter } from 'next/navigation';
import { IOffer, IOfferList } from 'types/Offer';
import { getByIdOffer, getOffer, updateOffer } from 'libs/endpoints/offer';

const OfferUpdateForm = ({ id }: { id: string }) => {
  const [Offer, setOffer] = useState<IOfferList>();
  const [Unit, setUnit] = useState([]);
  const router = useRouter();

  const fetchOffer = async () => {
    setOffer(await getByIdOffer(id));
  };

  const fetchUnits = async () => {
    let Units = await getOffer();
    setUnit(Units);
    }

  useEffect(() => {
    fetchOffer();
    fetchUnits();
}, [])

  const handleSubmit = async (formData: IOffer) => {

    console.log("formdata", formData);

    //await updateOffer(formData, id);
    //router.push('/admin/offer');
  };

  let fields: IFieldsProps = {
    title: 'Update Offer ',
    disabled: false,
    fields: [
        {label: "Name", name: "name", inputType: "text", placeholder: "Name"},
        {label: "Description", name: "description", inputType: "text", placeholder: "Description"},
        {label: "Start Date", name: "startDate", inputType: "date", placeholder: "Start Date"},
        {label: "End Date", name: "endDate", inputType: "date", placeholder: "End Date"},
        {label: "Discount", name: "discount", inputType: "number", placeholder: "Discount"},
    ],
    dropDownLists: [
      {label: "Unit Number", name: "unitId", displayName: "unitNumber", placeholder: "Unit Number", value: "id", data: Unit},
    ],
    heading: 'Update Offer',
    data: Offer,
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

export default OfferUpdateForm;