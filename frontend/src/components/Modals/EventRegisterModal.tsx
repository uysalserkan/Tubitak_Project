import {Button, Col, Container, Form, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {UserAPI} from "../../api/UserAPI";
import {UserModel} from "../../api/models/UserModel";
import {toast} from "react-toastify";
import {MessageType} from "../../dto/MessageResponse";
import {QRCodeAPI} from "../../api/QRCodeAPI";


const initialUserState: UserModel = {
    tcNo: "",
    firstName: "",
    lastName: ""
}

function EventRegisterModal(props) {

    const qrCodeAPI = new QRCodeAPI();


    const getQRCode = () => {
        qrCodeAPI.getQRCode(props.eventId, userModel.tcNo).then((response) => {
            props.setQrCodeModel(response)
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
    }


    const [isChecked, setIsChecked] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userModel, setUserModel] = useState(initialUserState);

    const userAPI = new UserAPI();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setUserModel(updateInpuStete(field, value));

    }


    const updateInpuStete = (field: String, value: String) => {
        const prevUserModel = {...userModel};
        switch (field) {
            case "tcno":
                prevUserModel.tcNo = value;
                break;
            case "firstname":
                prevUserModel.firstName = value;
                break;
            case "lastname":
                prevUserModel.lastName = value;
                break;
        }

        return prevUserModel;
    }


    const getUser = async (tcNo: String): Promise<UserModel> => {
        return await userAPI.findByTCNo(tcNo);

    }

    const registerUser = async (userModel: UserModel) => {
        return await userAPI.postUser(userModel)
    }

    const registerEventUser = async (id: number, userModel: UserModel) => {
        // const response = await registerUser(userModel);
        // if (response.messageResponseType === MessageType.SUCCESS) {
        return await userAPI.registerUserToEvent(id, userModel);
        // } else {
        //     return response;
        // }

    }

    return (
        <Modal show={props.isOpen} onHide={props.handleClose} animation={true} backdrop="static" onExited={() => {
            setIsChecked(false);
            setIsRegistered(false);
            setUserModel(initialUserState);
        }
        }>
            <Modal.Header>
                <Modal.Title>{`Register to ${props.eventName}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>

                    <Row className="mb-3 align-items-end">
                        <Col className="col-sm-9">
                            <Form.Group controlId="tcno">
                                <Form.Label>T.C. No</Form.Label>
                                <FormControl
                                    readOnly={isChecked}
                                    onChange={onChange}
                                    required
                                    type="text"
                                    name="tcno"
                                    placeholder="25110819980"
                                    maxLength={11}
                                />
                            </Form.Group>
                        </Col>
                        <Col>

                            <Button variant="secondary"
                                    onClick={() => {
                                        if (userModel.tcNo.length < 11) {
                                            toast.warn(`Please enter a valid T.C. number`, {
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
                                            getUser(userModel.tcNo).then((data) => {
                                                setUserModel(data)
                                                if (data.firstName == null) {
                                                    setIsChecked(true);
                                                    setIsRegistered(false);

                                                    toast.warning(`The user is not found in database, you could input your name`, {
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
                                                    setIsChecked(true);
                                                    setIsRegistered(true);

                                                    toast.info(`The user is loaded from database`, {
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

                                            })
                                                .catch(() => {
                                                    setIsChecked(true);
                                                    setIsRegistered(false);

                                                    toast.warning(`The user is not found in database, you could input your name`, {
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: false,
                                                            draggable: true,
                                                            progress: undefined,
                                                        }
                                                    );
                                                });
                                        }
                                    }}
                                    disabled={isChecked}
                            >Check</Button>
                        </Col>
                    </Row>
                    {
                        isChecked ? <Row>
                            <Col>
                                <FormGroup controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <FormControl
                                        readOnly={isRegistered}
                                        onChange={onChange}
                                        required
                                        type="text"
                                        name="firstname"
                                        placeholder={isRegistered ? `${userModel.firstName}` : "Firstname"}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <FormControl
                                        readOnly={isRegistered}
                                        onChange={onChange}
                                        required
                                        type="text"
                                        name="lastname"
                                        placeholder={isRegistered ? `${userModel.lastName}` : "Lastname"}
                                    />
                                </FormGroup>
                            </Col>
                        </Row> : null
                    }
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    setIsChecked(false);
                    setIsRegistered(false);
                    setUserModel(initialUserState);
                    props.handleClose();
                }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    if (!isChecked) {
                        toast.warn(`Please check your valid T.C. number`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            }
                        )
                    } else if (userModel.firstName.length < 2) {
                        toast.warn(`Please enter a firstname that has min. 2 characters`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            }
                        )
                    } else if (userModel.lastName.length < 2) {
                        toast.warn(`Please enter a lastname that has min. 2 characters`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            }
                        )
                    } else {
                        if (!isRegistered) {
                            registerUser(userModel).then((response) => {
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
                                    } else {
                                        toast.error(`${response.message}`, {
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
                            })
                        }

                        setTimeout(() => {
                            registerEventUser(props.eventId, userModel).then((response) => {
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

                                        // getQRCode();

                                    } else if (response.messageResponseType === MessageType.ERROR) {
                                        toast.error(` ${response.message}`, {
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
                            })
                        }, 300);


                        setTimeout((x) => {
                            setIsChecked(false);
                            setIsRegistered(false);
                            setUserModel(initialUserState);
                            props.setUser(userModel);
                            getQRCode();
                            props.openQRCodeModel(true)

                            props.handleClose();

                        }, 500)

                    }
                    /*
                    * Eğer kullanıcı sistemde kayıtlı değilse min. 2 karakterli adı ve soyadı ile kayıt edilecek.
                    * Sonra Event'e kayıt olacak.
                    * Eğer kullanıcı sistemde kayıtlı ise direkt olarak Event'e kayıt olacak.
                    *
                    * Regşster'e basıldığında event'e kayıt olduktan sonra bu Modal kapatılıp QRCOde modal ekrana gelecek..
                    */
                }}>
                    Register
                </Button>
            </Modal.Footer>

        </Modal>

    )
        ;
}

export default EventRegisterModal;