import {Button, Col, Form, Row} from "react-bootstrap";
import {ChangeEvent, useState} from "react";
import {EventModel} from "../api/models/EventModel";
// import {LocationModel} from "../api/models/LocationModel";
import {EventCategory} from "../api/enums/EventCategory";
import {EventAPI} from "../api/EventAPI";

// ! EventName, EventStartDate, EventEndDate, EventQuota, EventLocation(Latitude, Longtitude), EventStatus, EventCategory

interface Props {
    addEvent: (event: EventModel) => void
}

// const initialLocation: LocationModel = {
//     latitude: "2508",
//     longtitude: "1998"
// }

const initialState: EventModel = {
    eventName: "",
    startDate: "",
    endDate: "",
    eventStatus: true,
    quota: 0,
    location: {
        latitude: "25",
        longtitude: "SZ"
    },
    eventCategory: EventCategory.OTHERS
}

function AddEvent(props: Props) {
    const [eventModel, setEventModel] = useState(initialState);

    const eventAPI = new EventAPI();

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setEventModel(updateFormState(field, value));

    }

    const addEvent = async (model: EventModel) => {
        const response = eventAPI.postEvent(model);
        console.log(response);
    }

    function updateFormState(field: String, value: any) {
        const updatedEventModel = {...eventModel};

        if (field === "eventName") {
            updatedEventModel.eventName = value;
        } else if (field === "startDate") {
            updatedEventModel.startDate = value;
        } else if (field === "endDate") {
            updatedEventModel.endDate = value;
        } else if (field === "eventStatus") {
            updatedEventModel.eventStatus = value;
        } else if (field === "quota") {
            updatedEventModel.quota = value;
        } else if (field === "latitude") {
            updatedEventModel.location.latitude = value;
        } else if (field === "longtitude") {
            updatedEventModel.location.longtitude = value;
        } else if (field === "eventCategory") {
            updatedEventModel.eventCategory = value;
        }

        return updatedEventModel;
    }


    return (
        <div className="w-50 m-lg-5 bg-light ">
            <Form style={{padding:"20px"}}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="eventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            onChange={onFormChange}
                            required
                            type="text"
                            name="eventName"
                            placeholder="Event | 25"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="startDate">
                        <Form.Label>Event Start Date</Form.Label>
                        <Form.Control
                            onChange={onFormChange}
                            type="date"
                            name='startDate'/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="endDate">
                        <Form.Label>Event End Date</Form.Label>
                        <Form.Control
                            onChange={onFormChange}
                            type="date"
                            name='endDate'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Group as={Col} md="4" controlId="latitude">
                        <Form.Control
                            onChange={onFormChange}
                            required
                            type="text"
                            placeholder="Latitude"
                            name='latitude'/>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="longtitude">
                        <Form.Control
                            onChange={onFormChange}
                            required
                            type="text"
                            placeholder="Longtitude"
                            name='longtitude'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="quota">
                        <Form.Control
                            onChange={onFormChange}
                            type="number"
                            placeholder="minimum 5"
                            name="quota"/>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="eventCategory">
                        <Form.Control onChange={onFormChange}
                                      as="select"
                                      name="eventCategory">
                            <option value={EventCategory.OTHERS}>OTHER</option>
                            <option value={EventCategory.GAME}>GAME</option>
                            <option value={EventCategory.CODE}>CODE</option>
                            <option value={EventCategory.MUSIC}>MUSIC</option>
                            <option value={EventCategory.RACE}>RACE</option>
                            <option value={EventCategory.EDUCATION}>EDUCATION</option>
                            <option value={EventCategory.BUSINESS}>BUSINESS</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} md="8" controlId="submitButton">
                    <Button onClick={() => addEvent(eventModel)}>Save</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default AddEvent;