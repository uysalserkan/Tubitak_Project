import React, {useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import EventDetailModal from "./Modals/EventDetailModal";
import DeleteEventModal from "./Modals/DeleteEventModal";
import EventRegisterModal from "./Modals/EventRegisterModal";
import moment from "moment";
import QRCodeModal from "./Modals/QRCodeModals";
import {UserModel} from "../api/models/UserModel";
import UpdateEventModal from "./Modals/UpdateEventModal";
import {QRCodeModel} from "../api/models/QRCodeModel";
import {AuthAPI} from "../api/AuthAPI";
import jwt from "jwt-decode";

const initialUserState: UserModel = {
    tcNo: "",
    firstName: "",
    lastName: ""
}

const initialQRCode: QRCodeModel = {
    eventId: 0,
    eventName: "",
    firstName: "",
    lastName: "",
    userTcNo: "",
    creationDate: "25.11.1998"
}

function EventCard(props) {
    const authAPI = new AuthAPI();

    let adminName;
    try {

        // @ts-ignore
        adminName = jwt(authAPI.getToken()).sub;
    } catch (e) {

        adminName = "";
    }


    const [qrCodeModel, setQrCodeModel] = useState(initialQRCode)
    const [isRegisterModalOpen, setRegisterModal] = useState(false);
    const [isDetailModalOpen, setDetailModal] = useState(false);
    const [isDeleteEventModalOpen, setDeleteEventModal] = useState(false);
    const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
    const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false);

    const [exportedUserModel, setExportedUserModel] = useState(initialUserState);

    function isLive() {
        const currentDate = (moment(new Date()).format("YYYY-MM-DD"));
        return (
            props.startDate < currentDate
            &&
            props.endDate > currentDate
        );
    }


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
                            <Button className="btn-sm " variant="outline-danger" hidden={!adminName}
                                    onClick={() => {
                                        setDeleteEventModal(true);
                                    }}>Delete</Button>
                            <DeleteEventModal
                                isOpen={isDeleteEventModalOpen}
                                handleClose={() => setDeleteEventModal(false)}
                                eventId={props.id}
                                startDate={props.startDate}
                                endDate={props.endDate}
                            />
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Card.Title style={{fontSize: "28px"}}>{isLive() ? "🟢 " : ""}{props.eventName}</Card.Title>
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
                                <strong>{props.quota > 0 ? props.quota : "Sorry, full quota.."}</strong>
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
                                setIsUpdateEventModalOpen={setIsUpdateEventModalOpen}
                            />
                        </Col>

                        <Col className="col-lg-4">
                            <Button variant="outline-success" className="btn-lg btn-block"
                                    disabled={props.quota <= 0}
                                    onClick={
                                        () => {
                                            const inDate = (moment(new Date()).format("YYYY-MM-DD"))

                                            if (props.endDate < inDate) {
                                                toast.info(`You cannot register this event, because this event is passed..`, {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: false,
                                                        draggable: true,
                                                        progress: undefined,
                                                    }
                                                );
                                            } else {
                                                setRegisterModal(true)

                                            }
                                        }
                                    }
                            >Register </Button>
                            <EventRegisterModal
                                isOpen={isRegisterModalOpen}
                                handleClose={() => setRegisterModal(false)}
                                eventId={props.id}
                                eventName={props.eventName}
                                setUser={setExportedUserModel}
                                openQRCodeModel={setIsQRCodeModalOpen}
                                setQrCodeModel={setQrCodeModel}

                            />
                            <QRCodeModal
                                isOpen={isQRCodeModalOpen}
                                handleClose={() => setIsQRCodeModalOpen(false)}
                                user={exportedUserModel}
                                eventId={props.id}
                                eventName={props.eventName}
                                qrCodeModel={qrCodeModel}
                            />
                            <UpdateEventModal
                                isOpen={isUpdateEventModalOpen}
                                handleClose={() => setIsUpdateEventModalOpen(false)}
                                event={props}
                            />
                        </Col>
                    </Row>
                </Card.Footer>
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
            </Card>
        </div>

    )
        ;
}

export default EventCard;