import './LoginPage.css';
import React, {ChangeEvent, useState} from "react";
import jwt from 'jwt-decode';
import {LoginModel} from "../api/models/LoginModel";
import {AuthAPI} from "../api/AuthAPI";
import {Button} from "react-bootstrap";
import {MessageType} from "../dto/MessageResponse";
import {toast, ToastContainer} from "react-toastify";

const initialAdminState: LoginModel = {
    username: "",
    password: ""
}

const authAPI = new AuthAPI();

let adminName;
try {

    // @ts-ignore
    adminName = jwt(authAPI.getToken()).sub;
} catch (e) {

    adminName = "";
}

function LoginPage() {
    const [adminModel, setAdminModel] = useState(initialAdminState);
    const authAPI = new AuthAPI();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;

        setAdminModel(updateInputState(field, value));

    }

    const updateInputState = (field: String, value: String) => {
        const prevUserModel = {...adminModel};
        switch (field) {
            case "username":
                prevUserModel.username = value;
                break;
            case "password":
                prevUserModel.password = value;
                break;
        }

        return prevUserModel;
    }

    function loginAdmin() {
        return authAPI.loginAdmin(adminModel);
    }


    return (
        <body className="login-body">
        {
            adminName === "" ? <div className="container" style={{marginTop: "120px", marginBottom: "120px"}}>
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                                <div className="card-img-left d-none d-md-flex">
                                </div>
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5"
                                        style={{paddingBottom: "53px"}}>Admin - Login</h5>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                    }}>

                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInputUsername"
                                                   name="username"
                                                   onChange={onChange}
                                                   placeholder="username" required autoFocus/>
                                            <label htmlFor="floatingInputUsername">Username</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="floatingPassword" required
                                                   name="password"
                                                   onChange={onChange}
                                                   placeholder="Password"/>
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>

                                        <div className="d-grid mb-2">
                                            <Button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                                                    style={{marginTop: "30px"}}
                                                    type="submit"
                                                    onClick={() => {
                                                        loginAdmin().then((resp) => {
                                                            if (resp.messageResponseType === MessageType.ERROR) {
                                                                toast.error(`${resp.message}`, {
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
                                                                const admin = jwt(resp.token)
                                                                // @ts-ignore
                                                                toast.success(`You logged in as ${admin.sub} successfully!`, {
                                                                        position: "top-right",
                                                                        autoClose: 1500,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: false,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                    }
                                                                )
                                                                setTimeout(() => {
                                                                    window.location.replace("/")
                                                                }, 1500)

                                                            }
                                                        }).catch((err) => {
                                                            toast.warn(`Please check your username and password`, {
                                                                    position: "top-right",
                                                                    autoClose: 5000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: false,
                                                                    draggable: true,
                                                                    progress: undefined,
                                                                }
                                                            )
                                                        })
                                                    }}
                                            >Login

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
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                setTimeout(() => {
                    window.location.replace("/")
                })
        }

        </body>

    );
}

export default LoginPage;