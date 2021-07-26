import {Button, Container, Modal} from "react-bootstrap";
import QRCode from "qrcode.react";
import React, {useState} from "react";
import {toast} from "react-toastify";


function QRCodeModal(props) {
    const [isSavedQRCode, setIsSavedQRCode] = useState(false);

    const downloadQRCode = () => {
        // Generate download with use canvas and stream

        const canvas = document.getElementById(`${props.user.tcNo}_qrCode`) as HTMLCanvasElement;

        const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        const link = document.createElement('a');
        link.download = `${props.user.tcNo}_qrCode.png`;
        link.href = img;
        link.click();
        // document.write('<img src="' + img + '"/>');
    };


    return (
        <Modal show={props.isOpen} onHide={props.handleClose} animation={true} backdrop="static">
            <Modal.Header>
                <Modal.Title>{`QRCode - ${props.user.firstName} ${props.user.lastName}`}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container className="align-items-end">
                    <QRCode
                        id={`${props.user.tcNo}_qrCode`}
                        value={`${JSON.stringify(props.qrCodeModel)}`}
                        size={256}
                    />
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
                                toast.warning(`You have to save your QRCode for close this window..`, {
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