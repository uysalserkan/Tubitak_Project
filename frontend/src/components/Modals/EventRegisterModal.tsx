import {Button, Col, Container, Form, FormControl, FormGroup, FormText, Modal, Row} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {UserAPI} from "../../api/UserAPI";
import {UserModel} from "../../api/models/UserModel";
import {toast} from "react-toastify";

const initialUserState: UserModel = {
    tcNo: "",
    firstName: "",
    lastName: ""
}

function EventRegisterModal(props) {
    const [isChecked, setIsChecked] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userModel, setUserModel] = useState(initialUserState);

    const userAPI = new UserAPI();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setUserModel(updateInpuStete(field, value));
    }


    const updateInpuStete = (field: String, value: any) => {
        const prevUserModel = {...userModel};
        switch (field) {
            case "tcno":
                prevUserModel.tcNo = value;
                break;
            case "firstName":
                prevUserModel.firstName = value;
                break;
            case "lastName":
                prevUserModel.lastName = value;
                break;
        }

        return prevUserModel;
    }


    const getUser = async (tcNo: String): Promise<UserModel> => {
        return await userAPI.findByTCNo(tcNo);

    }

    const registerUser = async (userModel: UserModel) => {
        return await userAPI.postUser(userModel);
    }

    const registerEventUser = async (id: number, userModel: UserModel) => {
        return await userAPI.registerUserToEvent(id, userModel);
    }

    return (
        <Modal show={props.isOpen} onHide={props.handleClose} animation={true} backdrop="static">
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

                            <Button
                                onClick={() => {
                                    if (userModel.tcNo.length < 11) {
                                        toast.warn(`Please enter a valid T.C. number..`, {
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
                                        const output = getUser(userModel.tcNo).then((data) => {
                                            setUserModel(data);
                                            setIsChecked(true);
                                            setIsRegistered(true);

                                            toast.info(`The user is loaded from database..`, {
                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: true,
                                                    progress: undefined,
                                                }
                                            );

                                        }).catch(() => {
                                            setIsChecked(true);
                                            setIsRegistered(false);

                                            toast.info(`The user is not found in database, you could input your name..`, {
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
                <Button variant="secondary" onClick={() => {
                    setIsChecked(false);
                    setIsRegistered(false);
                    setUserModel(initialUserState);
                    props.handleClose();
                }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    props.handleClose();

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

    );
}

export default EventRegisterModal;