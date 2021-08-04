import {AuthAPI} from "../api/AuthAPI";
import jwt from "jwt-decode";
import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI, EventQueryResponse} from "../api/EventAPI";
import React, {useEffect, useState} from "react";
import {QRCodeModel} from "../api/models/QRCodeModel";
import {BrowserRouter as Router, Route, Link, BrowserRouter} from "react-router-dom";
import {Col, Row, Table} from "react-bootstrap";
import moment from "moment";
import EventBarChart from "../components/EventBarChart";

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


let eventData = [];


export function AdminPage() {
    const [activeEvents, setActiveEvents] = useState<EventQueryResponse[]>([]);
    const [qrCodes, setQRCodes] = useState<QRCodeModel[]>([]);
    const inDate = (moment(new Date()).format("YYYY-MM-DD"))


    useEffect(() => {

        eventAPI.getEvent().then(r => {
            setActiveEvents(r)

        })
        qrCodeAPI.getAll().then((resp) => {
            setQRCodes(resp)

        })


    }, [])

    function getEventAttendees() {

        eventData.forEach((eventEach) => {
            qrCodes.forEach((qrEach) => {
                // @ts-ignore
                if (qrEach.eventId === eventEach.eventId) {
                    // @ts-ignore
                    eventEach.userCounter++;
                }
            })
        })


    }

    function initializeEventData() {
        if (eventData.length <= activeEvents.length && qrCodes.length > 0) {
            eventData = []
            activeEvents.forEach(each => {
                // @ts-ignore
                eventData.push({eventId: each.id, eventName: each.eventName as string, userCounter: 0})


            })
            getEventAttendees()
        }
    }

    initializeEventData()


    return adminName === "" ? setTimeout(() => {
            window.location.replace("/")
        }) :

        <div
            className="d-flex flex-xl-wrap align-items-center align-middle"
            style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
        >


            <div className="container-fluid">
                <Row className="align-content-center">
                    <Col className="align-items-center">
                        <h1 className="align-text-top text-light mb-3">Live or Future Events</h1>
                    </Col>
                </Row>
                <Row className="align-content-center">
                    <Col className="align-self-center">
                        <EventBarChart
                            eventData={eventData}
                            XKey="eventName"
                            barKey="userCounter"
                        />

                    </Col>
                </Row>
            </div>

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