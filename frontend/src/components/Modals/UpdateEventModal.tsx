import {Button, Col, Form, FormControl, FormLabel, FormText, Modal, Row} from "react-bootstrap";
import {EventCategory} from "../../api/enums/EventCategory";
import React, {ChangeEvent, useState} from "react";
import {EventModel} from "../../api/models/EventModel";
import {EventAPI} from "../../api/EventAPI";
import {toast} from "react-toastify";
import {MessageType} from "../../dto/MessageResponse";

/*
 * Tüm ön gereksinimleri bu kısımda yapacaz. Eğer sistemde belirttiğimiz kısıtlardan
 * birisi veya birkaçı çalışmıyorsa direkt olarak buradan hata mesajı döndürecez.
 * Tüm alanlara boş bırakılamaz diye kontrol yapılmalı.
 * Event Name: 3 karakterden az olamaz.
 * Start Date: Geçmiş bir tarih olamaz.
 * End Date: Başlangıç tarihinden önce olamaz.
 * Quota: En az beş olmalı ve önceki kayıt olan kullanıcıları etkilemez bu update diye not düşülmeli.
 */


function UpdateEventModal(props) {
    const initialState: EventModel = {
        eventName: props.event.eventName,
        startDate: props.event.startDate,
        endDate: props.event.endDate,
        eventStatus: props.event.status,
        quota: props.event.quota,
        location: {
            latitude: props.event.location.latitude,
            longtitude: props.event.location.longtitude
        },
        eventCategory: EventCategory[props.event.eventCategory]
    }

    const [updateEvent, setUpdateEvent] = useState(initialState);

    const eventAPI = new EventAPI();

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setUpdateEvent(updateFormState(field, value));

    }

    function updateFormState(field: String, value: any) {
        const updatedEventModel = {...updateEvent};

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

    function isValid() {
        if (updateEvent.eventName.length < 3) {
            toast.warning(`🚫 You have to fill event name min. 3 character`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                }
            );
            return false;
        } else if (updateEvent.endDate < updateEvent.startDate) {
            toast.warning(`🚫 You cannot select end date before start date.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                }
            );
            return false;
        } else if (updateEvent.quota < 5) {
            toast.warning(`🚫 You have to give min. 5 quota.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                }
            );
            return false;
        } else {
            if (updateEvent.location.latitude === "") {
                updateEvent.location.latitude = "251108"
            }
            if (updateEvent.location.longtitude === "") {
                updateEvent.location.longtitude = "1998"
            }
            return true;
        }
    }


    return (

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true} backdrop="static">
            <Modal.Header>
                <Modal.Title>UPDATE - {props.event.eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="id">
                        <FormLabel><strong>Event ID</strong></FormLabel>
                        <FormControl readOnly type="number" value={props.event.id}/>
                        <FormText>You cannot edit the Event id.</FormText>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="eventName">
                        <FormLabel><strong>Event Name</strong></FormLabel>
                        <Form.Control
                            name="eventName"
                            type="text"
                            onChange={onFormChange}
                            defaultValue={props.event.eventName}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Col className="mb-3">
                        <Form.Group as={Col} controlId="startDate">
                            <FormLabel><strong>Start Date</strong></FormLabel>
                            <FormControl
                                name="startDate"
                                type="date"
                                onChange={onFormChange}
                                defaultValue={props.event.startDate}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="mb-3">
                        <Form.Group as={Col} controlId="endDate">
                            <FormLabel><strong>End Date</strong></FormLabel>
                            <FormControl
                                name="endDate"
                                type="date"
                                onChange={onFormChange}
                                defaultValue={props.event.endDate}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label><strong>Location</strong></Form.Label>
                    <Col className="mb-3">
                        <Form.Group as={Col} controlId="latitude">
                            <FormLabel><i>Latitude</i></FormLabel>
                            <FormControl
                                name="latitude"
                                type="text"
                                onChange={onFormChange}
                                defaultValue={props.event.location.latitude}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="mb-3">
                        <Form.Group as={Col} controlId="longtitude">
                            <FormLabel><i>Longtitude</i></FormLabel>
                            <FormControl
                                name="longtitude"
                                type="text"
                                onChange={onFormChange}
                                defaultValue={props.event.location.longtitude}
                            />
                        </Form.Group>
                    </Col>
                    <FormText>If you want to blank this locations, there will be fill with default values.</FormText>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="quota">
                        <FormLabel><strong>Quota</strong></FormLabel>
                        <FormControl
                            name="quota"
                            type="number"
                            onChange={onFormChange}
                            defaultValue={props.event.quota}
                        />
                        <FormText>This is remaining quota, this change is not effect registered users.</FormText>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="eventCategory">
                        <FormLabel><strong>Category</strong></FormLabel>
                        <Form.Control onChange={onFormChange}
                                      as="select"
                                      name="eventCategory"
                                      defaultValue={EventCategory[props.event.eventCategory]}
                        >
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
                <Button variant="success" onClick={() => {
                    if (isValid()) {
                        eventAPI.updateEventById(props.event.id, updateEvent).then((response) => {
                            if (response.messageResponseType === MessageType.SUCCESS) {
                                toast.success(`🖋 ${response.message}`, {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                    }
                                );
                                setUpdateEvent(initialState);
                                setTimeout((x) => {
                                    window.location.reload()
                                }, 1000);
                            }
                            if (response.messageResponseType === MessageType.ERROR) {
                                toast.error(`📢 ${response.message}`, {
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
                        }).catch((err) => {
                            toast.error(`❌ ${err}`, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                }
                            );
                        })
                    }
                }}>Save</Button>
                <Button variant="secondary" onClick={
                    () => {
                        setUpdateEvent(initialState)
                        props.handleClose();
                    }
                }>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateEventModal;