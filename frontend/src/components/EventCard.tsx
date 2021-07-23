import React, {useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {EventAPI} from "../api/EventAPI";
import {toast, ToastContainer} from "react-toastify";
import EventDetailModal from "./Modals/EventDetailModal";
import DeleteEventModal from "./Modals/DeleteEventModal";

function EventCard(props) {
    const eventAPI = new EventAPI();
    const [isRegisterModalOpen, setRegisterModal] = useState(false);
    const [isDetailModalOpen, setDetailModal] = useState(false);
    const [isDeleteEventModalOpen, setDeleteEventModal] = useState(false);

    return (
        <div>


            <Card className="bg-light" style={{width: '25rem', height: "25rem", padding: '4px'}}>

                {/*25o<3SZ*/}
                <Card.Header as="h5">
                    <Row>
                        <Col>
                            Category:
                        </Col>
                        <Col>
                            <strong> {props.eventCategory}</strong>
                        </Col>
                        <Col className="col-lg-3 ">
                            <Button className="btn-sm " variant="outline-danger"
                                    onClick={() => {
                                        setDeleteEventModal(true);
                                    }}>Delete</Button>
                            <DeleteEventModal
                                isOpen={isDeleteEventModalOpen}
                                handleClose={() => setDeleteEventModal(false)}
                                eventId={props.id}
                            />
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Card.Title style={{fontSize: "28px"}}>{props.eventName}</Card.Title>
                    <Container>
                        <Row className="bottom-0 mt-5">
                            <Col>
                                <i>Event Start Date: </i>
                            </Col>
                            <Col>
                                <strong>{props.startDate}</strong>
                            </Col>
                        </Row>
                        <Row className="bottom-0 mt-3">
                            <Col>
                                <i>Event End Date: </i>
                            </Col>
                            <Col>
                                <strong>{props.endDate}</strong>
                            </Col>
                        </Row>
                        <Row className="bottom-0 mt-3">
                            <Col>
                                <i>Remaining Quota:</i>
                            </Col>
                            <Col>
                                <strong>{props.quota}</strong>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <Button variant="outline-primary" className="btn-lg" onClick={() => {

                                setDetailModal(true);

                            }
                            }>Details</Button>
                            <EventDetailModal
                                isOpen={isDetailModalOpen}
                                handleClose={() => setDetailModal(false)}
                                event={props}
                                addEventFunction={null}
                            />
                        </Col>

                        <Col className="col-lg-4">
                            <Button variant="outline-success" className="btn-lg btn-block"
                                    onClick={
                                        () => setRegisterModal(true)
                                    }
                            >Register </Button>


                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
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
        </div>

    )
        ;
}

export default EventCard;