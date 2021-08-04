import {Button, Col, Modal, Row} from "react-bootstrap";
import {AuthAPI} from "../../api/AuthAPI";
import jwt from "jwt-decode";

const authAPI = new AuthAPI();

let adminName;
try {

    // @ts-ignore
    adminName = jwt(authAPI.getToken()).sub;
} catch (e) {

    adminName = "";
}

function EventDetailModal(props) {


    return (

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{props.event.eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <h5>Category</h5>
                <Row>
                    <Col>{props.event.eventCategory == null ? "OTHERS" : props.event.eventCategory}</Col>
                </Row>

                <br/>
                <h5>Location</h5>
                <Row>
                    <Col><i> <strong>Latitude: </strong></i>{props.event.location.latitude}</Col>
                    <Col> <i><strong> Longtitude: </strong></i>{props.event.location.longtitude}</Col>
                </Row>


                <br/>
                <h5>Dates</h5>
                <Row>
                    <Col><strong><i>Start Date: </i></strong>{props.event.startDate}</Col>
                    <Col><strong><i>End Date: </i></strong>{props.event.endDate}</Col>
                </Row>

                <br/>
                <h5>Remaining Quota</h5>
                <Row>
                    <Col>{props.event.quota > 0 ? props.event.quota : "Sorry, Event is full.."}</Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"
                        hidden={!adminName}
                        onClick={() => {
                            props.setIsUpdateEventModalOpen(true);
                            props.handleClose();
                        }}
                >Update</Button>
                <Button variant="secondary" onClick={
                    () => props.handleClose()
                }>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>

    );
}

export default EventDetailModal;