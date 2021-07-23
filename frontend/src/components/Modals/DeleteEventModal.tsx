import {Button, Modal} from "react-bootstrap";
import {EventAPI} from "../../api/EventAPI";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import {MessageType} from "../../dto/MessageResponse";

function DeleteEventModal(props) {
    const eventAPI = new EventAPI();
    return (

        <Modal show={props.isOpen} onHide={props.handleClose} animation={true}>
            <Modal.Header>
                <Modal.Title>{props.eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Do you want to really delete this event?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={
                    () => {
                        eventAPI.deleteEventById(props.eventId).then((response) => {
                                if (response.messageResponseType == MessageType.ERROR) {
                                    toast.error(`⚠ ${response.message}`, {
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
                                } else if (response.messageResponseType === MessageType.SUCCESS) {
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
                                    setTimeout((x) => {
                                        window.location.reload();
                                    }, 5000);
                                }
                            }
                        ).catch((err) => {
                                toast.error(`⚠ ${err}`, {
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
                        )
                    }
                }>Delete</Button>

                <Button variant="secondary" onClick={
                    () => props.handleClose()
                }>
                    Cancel
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

export default DeleteEventModal;