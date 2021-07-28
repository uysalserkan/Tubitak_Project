import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {EventAPI} from "../../api/EventAPI";
import {EventModel} from "../../api/models/EventModel";
import {EventCategory} from "../../api/enums/EventCategory";
import React, {ChangeEvent, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {MessageType} from "../../dto/MessageResponse";

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


function AddEventModal(props) {
    const [eventModel, setEventModel] = useState(initialState);
    const eventAPI = new EventAPI();

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setEventModel(updateFormState(field, value));

    }

    const addEvent = async (model: EventModel) => {
        return await eventAPI.postEvent(model);
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

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true}>
            <Modal.Header>
                <Modal.Title>Add Event | 25</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="eventName">
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
                    <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Event Start Date</Form.Label>
                        <Form.Control
                            onChange={onFormChange}
                            type="date"
                            name='startDate'/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="endDate">
                        <Form.Label>Event End Date</Form.Label>
                        <Form.Control
                            onChange={onFormChange}
                            type="date"
                            name='endDate'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Group as={Col} controlId="latitude">
                        <Form.Control
                            onChange={onFormChange}
                            required
                            type="text"
                            placeholder="Latitude"
                            name='latitude'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="longtitude">
                        <Form.Control
                            onChange={onFormChange}
                            required
                            type="text"
                            placeholder="Longtitude"
                            name='longtitude'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="quota">
                        <Form.Control
                            onChange={onFormChange}
                            type="number"
                            placeholder="minimum 5"
                            name="quota"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="eventCategory">
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

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="success" type="submit" onClick={
                    () => {
                        addEvent(eventModel).then((response) => {
                                console.log(response);
                                if (response.messageResponseType === MessageType.SUCCESS) {
                                    toast.success(`✔ ${response.message}`, {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: true,
                                            progress: undefined,
                                        }
                                    );
                                    props.handleClose();
                                    setEventModel(initialState);
                                    setTimeout((x) => {
                                        window.location.reload();
                                    }, 5000);
                                } else if (response.messageResponseType === MessageType.ERROR) {
                                    toast.error(`✔ ${response.message}`, {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: true,
                                            progress: undefined,
                                        }
                                    );
                                }
                            }
                        ).catch((err) => {
                                console.error("ERRORR\n\n" + err);
                                toast.error(`⚠ Please enter valid inputs for events..`, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                    }
                                );
                            }
                        );
                    }
                }>
                    Save
                </Button>
                < ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                />
            </Modal.Footer>
        </Modal>

    );
}

export default AddEventModal;