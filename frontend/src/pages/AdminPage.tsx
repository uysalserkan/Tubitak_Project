import {AuthAPI} from "../api/AuthAPI";
import jwt from "jwt-decode";
import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI, EventQueryResponse} from "../api/EventAPI";
import React, {useMemo, useState} from "react";
import {QRCodeModel} from "../api/models/QRCodeModel";
import {BrowserRouter as Router, Route, Link, BrowserRouter} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {MessageType} from "../dto/MessageResponse";
import {AdminEventDetailsModal} from "../components/Modals/AdminEventDetailsModal";
import {EventModel} from "../api/models/EventModel";
import {useHistory} from "react-router-dom";

import moment from "moment";
import AdminEventDetailPage from "./AdminEventDetailPage";
import Switch from "react-bootstrap/Switch";

const authAPI = new AuthAPI();
const qrCodeAPI = new QRCodeAPI();
const eventAPI = new EventAPI();

let adminName;
try {

    // @ts-ignore
    adminName = jwt(authAPI.getToken()).sub;
} catch (e) {

    adminName = "";
}


export function AdminPage() {
    // const [registeredData, setRegisteredData] = useState<QRCodeModel[]>([]);
    const [activeEvents, setActiveEvents] = useState<EventQueryResponse[]>([]);
    const inDate = (moment(new Date()).format("YYYY-MM-DD"))

    let history = useHistory();


    useMemo(() => {
        eventAPI.getEvent().then((resp) => {
            setActiveEvents(resp)
        })
    }, [])

    return adminName === "" ? setTimeout(() => {
        window.location.replace("/")
    }) : <div
        className="d-flex flex-xl-wrap align-items-center align-middle"
        style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
    >

        <h1 className="text-primary"> ADMİN PAGE</h1>


        <Table striped hover borderless variant="dark" id="eventTable">
            <caption>List of eventz</caption>
            <thead>
            <tr>
                <th className="col-1"/>
                <th>ID</th>
                <th>Status</th>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Quota</th>
            </tr>
            </thead>
            <tbody>

            {
                activeEvents
                    // @ts-ignore
                    .sort((a, b) => {
                        if (a.id > b.id) {
                            return 1;
                        } else if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    })
                    // .filter(each => {
                    //         return each.endDate > inDate
                    //     }
                    // )
                    .map(each =>
                        <tr key={each.id}>

                            <td>
                                <Link
                                    className="btn btn-primary"
                                    to={`/admin/${each.id}-${each.eventName}`}
                                    target={"_blank"}
                                >Details</Link></td>

                            <td>{each.id}</td>
                            <td>{
                                each.startDate < inDate ? (
                                        each.endDate > inDate ?
                                            <h5><span className="badge bg-success">Live</span></h5> :
                                            <h5><span className="badge bg-danger">Passed</span></h5>
                                    )
                                    :
                                    <h5><span className="badge bg-light text-black-50">Comming</span></h5>
                            }</td>
                            <td>{each.eventName}</td>
                            <td>{each.startDate}</td>
                            <td>{each.endDate}</td>
                            <td>{each.quota}</td>
                        </tr>
                    )

            }
            </tbody>

        </Table>

    </div>
        ;
}