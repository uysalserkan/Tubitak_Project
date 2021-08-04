import React, {useState} from "react";
import {Nav, Button, Form, FormControl} from "react-bootstrap";
import {BrowserRouter as Router, Route, Link, BrowserRouter} from "react-router-dom";
import EventCard from "./EventCard";
import RegisteredEventsPage from "../pages/RegisteredEventsPage";
import AddEvent from "../pages/AddEvent";
import HomePage from "../pages/HomePage";
import jwt from "jwt-decode";

import 'react-toastify/dist/ReactToastify.css';
import AddEventModal from "./Modals/AddEventModal";
import {EventQueryResponse} from "../api/EventAPI";
import {QRCodeAPI} from "../api/QRCodeAPI";
import {toast} from "react-toastify";
import LoginPage from "../pages/LoginPage";
import {AuthAPI} from "../api/AuthAPI";
import {AdminPage} from "../pages/AdminPage";
import AdminEventDetailPage from "../pages/AdminEventDetailPage";

function NavBar() {
    const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
    const [searchedTCNo, serSearchedTCNo] = useState("");
    const [registeredEvents, setRegisteredEvents] = useState<EventQueryResponse[]>([]);
    const qrCodeAPI = new QRCodeAPI();

    const authAPI = new AuthAPI();

    let adminName;
    try {

        // @ts-ignore
        adminName = jwt(authAPI.getToken()).sub;
    } catch (e) {

        adminName = "";
    }

    return (
        <Router>
            <div>
                <Nav className="navbar align-top navbar-expand-sm navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Event Platform</a>
                        <Button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </Button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li><Link className="dropdown-item" to="/registeredEvents">Bos Sayfaya
                                            git</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                </li>
                                <Button className="position-absolute start-50 btn-success" hidden={!adminName}
                                        onClick={() => {
                                            setAddEventModalOpen(true);
                                        }

                                        }> Add Event</Button>
                                <AddEventModal
                                    isOpen={isAddEventModalOpen}
                                    handleClose={() => setAddEventModalOpen(false)}
                                />

                            </ul>
                            <Form className="d-flex" onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <FormControl className=" me-2"
                                             type="text"
                                             placeholder="Your T.C. No"
                                             maxLength={11}
                                             onChange={(e) => {
                                                 serSearchedTCNo(e.target.value);
                                             }}
                                />
                                <Link className="btn btn-primary" to="/registeredEvents" onClick={() => {
                                    qrCodeAPI.getAllEventRegistered(searchedTCNo).then(
                                        (response) => {
                                            if (response) {
                                                setRegisteredEvents(response);
                                            } else {
                                                toast.warning(`Something goes wrong.`, {
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
                                    });

                                }}>Search</Link>
                            </Form>
                            <div style={{marginLeft: "12px", marginRight: "10px"}}>
                                {
                                    adminName === "" ? <Button onClick={() => {
                                        window.location.replace("/login");
                                    }}> Log in</Button> : <li className="nav-item dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button"
                                                id="dropdownMenuButton2" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                            Control Panel
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark"
                                            aria-labelledby="navbarDarkDropdownMenuLink">
                                            <li><a className="dropdown-item" onClick={() => {
                                                console.log("admin paneline gidiyoruz..")
                                                setTimeout(() => {
                                                    window.location.replace("/admin")
                                                })
                                            }
                                            }>Admin</a></li>
                                            <hr/>
                                            <li><a className="dropdown-item" onClick={() => {
                                                authAPI.logout()
                                                setTimeout(() => {
                                                    window.location.reload()
                                                }, 100)
                                            }
                                            }>Log out</a></li>
                                        </ul>
                                    </li>
                                }
                            </div>

                        </div>
                    </div>
                </Nav>
                <div className="main-links">
                    <Route path="/admin" exact={true} component={AdminPage}/>
                    <Route path="/" exact={true} component={HomePage}/>
                    <Route path="/registeredEvents" exact={true} component={
                        () => <RegisteredEventsPage registeredEvents={registeredEvents}/>
                    }/>
                    <Route path="/login" exact={true} component={LoginPage}/>
                    <Route path="/admin/:eventId-:eventName" exact={true}
                           render={(props) => <AdminEventDetailPage {...props}/>}/>

                </div>
            </div>
        </Router>
    );
}

export default NavBar;