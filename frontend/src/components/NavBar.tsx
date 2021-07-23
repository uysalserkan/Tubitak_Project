import React, {useState} from "react";
import {Nav, Button, Form} from "react-bootstrap";
import {BrowserRouter as Router, Route, Link, BrowserRouter} from "react-router-dom";
import EventCard from "./EventCard";
import BlankPage from "../pages/BlankPage";
import AddEvent from "../pages/AddEvent";
import HomePage from "../pages/HomePage";

import 'react-toastify/dist/ReactToastify.css';
import AddEventModal from "./Modals/AddEventModal";

function NavBar() {
    const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);

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
                                <li className="nav-item">
                                    <Link className="nav-link" to="/custom-page">Custom</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-event">Add Event</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    {/*<a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown"*/}
                                    {/*   role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                                    {/*    Link*/}
                                    {/*</a>*/}
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li><Link className="dropdown-item" to="/bos">Bos Sayfaya git</Link></li>
                                        {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        {/*<li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    {/*<a className="nav-link disabled" href="#" aria-disabled="true">Link</a>*/}
                                </li>
                                <Button className="position-absolute start-50 btn-success" onClick={() => {
                                    // <ToastFunct type="INFO" message="Bu bir info mesajıdır."/>
                                    setAddEventModalOpen(true);
                                }

                                }> Add Event</Button>
                                <AddEventModal
                                    isOpen={isAddEventModalOpen}
                                    handleClose={() => setAddEventModalOpen(false)}
                                />

                            </ul>
                            <Form className="d-flex">
                                <input className="form-control me-2" type="search"
                                       placeholder="enter an event name"
                                       aria-label="Search"/>
                                <button className="btn btn-primary" type="submit">Search</button>
                            </Form>
                        </div>
                    </div>
                </Nav>
                <div className="main-links">
                    <Route path="/custom-page" exact={true} component={EventCard}/>
                    <Route path="/" exact={true} component={HomePage}/>
                    <Route path="/bos" exact={true} component={BlankPage}/>
                    <Route path="/add-event" exact={true} component={AddEvent}/>
                </div>
            </div>
        </Router>
    );
}

export default NavBar;