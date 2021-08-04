import {Modal} from "react-bootstrap";

export function AdminEventDetailsModal(props) {
    if (props.isOpen)
        console.log(props)

    return (

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{props.eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                SAASDASDASD
            </Modal.Body>
        </Modal>);
}