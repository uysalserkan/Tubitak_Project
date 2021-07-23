import {Button, Modal} from "react-bootstrap";

function EventRegisterModal(props) {


    return (

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{props.event.eventName} Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    props.handleClose();
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default EventRegisterModal;