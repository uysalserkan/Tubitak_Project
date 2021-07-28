import {Button, Col, Container, FormControl, FormGroup, FormLabel, FormText, Modal, Row} from "react-bootstrap";
import QRCode from "qrcode.react";
import React, {useState} from "react";
import {toast} from "react-toastify";
import validator from 'validator'
import {QRCodeAPI} from "../../api/QRCodeAPI";
import {MessageType} from "../../dto/MessageResponse";


function QRCodeModal(props) {
    const [isSavedQRCode, setIsSavedQRCode] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    const qRCodeAPI = new QRCodeAPI();

    function isVaidEmail() {
        return validator.isEmail(emailAddress);
    }

    const downloadQRCode = () => {

        const canvas = document.getElementById(`${props.user.tcNo}_qrCode`) as HTMLCanvasElement;

        const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        const link = document.createElement('a');
        link.download = `${props.user.tcNo}_qrCode.png`;
        link.href = img;
        link.click();
    };


    return (
        <Modal show={props.isOpen} onHide={props.handleClose} animation={true} backdrop="static">
            <Modal.Header>
                <Modal.Title>{`QRCode - ${props.user.firstName} ${props.user.lastName}`}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container className="align-items-center">
                    <Row className="mb-3">

                        <QRCode
                            id={`${props.user.tcNo}_qrCode`}
                            value={`${JSON.stringify(props.qrCodeModel)}`}
                            size={256}
                        />
                    </Row>
                    <Row className="mb-3 align-items-center">
                        <Col className="col-lg-8 ">
                            <FormGroup controlId="email">
                                <FormLabel><strong>E Mail Address</strong></FormLabel>
                                <FormControl
                                    type="email"
                                    placeholder="serkan@uys.al"
                                    name="email"
                                    onChange={(e) => {
                                        setEmailAddress(e.target.value);
                                    }}
                                />
                                <FormText>Please enter your current email address.</FormText>
                            </FormGroup>
                        </Col>
                        <Col className="col-lg-4">
                            <Button
                                variant="outline-success"
                                className="col-lg-8"
                                type="submit"
                                onClick={() => {
                                    if (isVaidEmail()) {
                                        qRCodeAPI.sendQRCode(props.eventId, props.user.tcNo, emailAddress).then((response) => {


                                            if (response.messageResponseType === MessageType.SUCCESS) {
                                                toast.success(`${response.message}`, {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: false,
                                                        draggable: true,
                                                        progress: undefined,
                                                    }
                                                );
                                                setIsSavedQRCode(true);
                                            } else {
                                                toast.warn(`${response.message}`, {
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
                                            toast.error(`${err}`, {
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
                                    } else {
                                        toast.error(`${emailAddress} is not valid an email address.`, {
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
                                }
                            >Send</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary"
                        onClick={
                            () => {
                                downloadQRCode();
                                setIsSavedQRCode(true);
                            }
                        }
                >Save QRCode</Button>
                <Button variant="danger" id="download"
                        onClick={() => {
                            if (!isSavedQRCode) {
                                toast.warning(`You have to save or send email your QRCode for close this window..`, {
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
                                toast.success(`Your QRCode successfully saved..`, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                    }
                                );
                                setIsSavedQRCode(false)
                                setEmailAddress("");
                                props.handleClose();
                            }
                        }

                        }
                >Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default QRCodeModal;