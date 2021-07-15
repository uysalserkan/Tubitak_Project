import {EventModel} from "./models/EventModel";
import {LocationModel} from "./models/LocationModel";
import {EventCategory} from "./enums/EventCategory";
import {ChangeEvent, useState} from "react";
import {Modal, ModalDialog} from "react-bootstrap";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    addEvent: (event: EventModel) => void
}

const initialLocation: LocationModel = {
    latitude: "2508",
    longtitude: "1998"
}

const initialState: EventModel = {
    eventName: "",
    startDate: "",
    endDate: "",
    eventStatus: true,
    quota: 0,
    location: "initialLocation",
    eventCategory: EventCategory.OTHERS
}

export function addEvent(props: Props) {
    const [eventModel, setEventModel] = useState(initialState);

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
    }

    function updateFormState(field: String, value: String);
    function updateFormState(field: String, value: boolean);
    function updateFormState(field: String, value: number);
    function updateFormState(field: String, value: EventCategory);
    function updateFormState(field: String, value: LocationModel);


    function updateFormState(field: String, value: any) {
        const updatedEventModel = {...eventModel};

        if (field == "eventName") {
            updatedEventModel.eventName = value;
        } else if (field == "startDate") {
            updatedEventModel.startDate = value;
        } else if (field == "endDate") {
            updatedEventModel.endDate = value;
        } else if (field == "eventStatus") {
            updatedEventModel.eventStatus = value;
        } else if (field == "quota") {
            updatedEventModel.quota = value;
        } else if (field == "location") {
            updatedEventModel.location = value;
            // TODO: Location u şimdilik String yaptık eğer ayırabilirsek string olarak post üzerinden ayırabiliriz.
        } else if (field == "eventCategory") {
            updatedEventModel.eventCategory = value;
        }

        return updatedEventModel;
    }

    return (
        "lkdfjlksdfjglksdjfglksjdflgkjdlfgjsdlkfgjsdklfgjdlskfgf"
    );

}