import {AuthAPI} from "../api/AuthAPI";
import jwt from "jwt-decode";
import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI, EventQueryResponse} from "../api/EventAPI";
import React, {useEffect, useMemo, useState} from "react";
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


let eventData = [{}];


// function getEventAttendees(event: EventQueryResponse[]) {
//     event.forEach(each => {
//         qrCodeAPI.getAll().then((resp) => {
//             resp.forEach((each_resp) => {
//                 if (each_resp.eventId == each.id) {
//                     // eventData.indexOf(each.id)[0] += 1
//                 }
//             })
//         }).catch((err) => {
//         })
//         // eventData.push({id: each.id, eventName: each.eventName, userCounter: userCounter})
//     })
// }


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    }, {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    }, {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export function AdminPage() {
    const [activeEvents, setActiveEvents] = useState<EventQueryResponse[]>([]);
    const [qrCodes, setQRCodes] = useState<QRCodeModel[]>([]);
    const inDate = (moment(new Date()).format("YYYY-MM-DD"))


    useMemo(() => {
        qrCodeAPI.getAll().then((resp) => {
            setQRCodes(resp)

        })
        eventAPI.getEvent().then((resp) => {
            // ! 2 kere çalışıyor.
            setActiveEvents(resp)
            initializeEventData(resp)
            // getEventAttendees(resp)
        })

    }, [])

    function initializeEventData(event: EventQueryResponse[]) {
        if (eventData.length < event.length) {
            console.log("BU FONKSIYON KAÇ KERE ÇALIŞIYOR.")
            event.forEach(each => {
                if (eventData.indexOf({id: each.id, eventName: each.eventName, userCounter: 0}) === -1) {
                    eventData.push({id: each.id, eventName: each.eventName, userCounter: 0})
                } else {
                    console.log("BU ELEMENT ZATEN VAR..")
                }
            })
            getEventAttendees()
        }
    }

    function getEventAttendees() {
        eventData.forEach(eventEach => {
            qrCodes.forEach((qrEach) => {
                // @ts-ignore
                if (qrEach.eventId === eventEach.id) {
                    // @ts-ignore
                    eventEach.userCounter++;
                }
            })
        })

    }

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
                        {/*<BarChart width={1800} height={500} data={eventData}>*/}
                        {/*    <XAxis dataKey="eventName" stroke="#8884d8"/>*/}
                        {/*    <YAxis/>*/}
                        {/*    <Tooltip/>*/}
                        {/*    <Bar dataKey="userCounter" fill="#8884d8" barSize={50}/>*/}
                        {/*</BarChart>*/}
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