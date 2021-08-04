import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI} from "../api/EventAPI";
import React, {useEffect, useMemo, useState} from "react";
import {QRCodeModel} from "../api/models/QRCodeModel";
import {Col, Row, Table} from "react-bootstrap";
import {log} from "util";
import {forEach} from "react-bootstrap/ElementChildren";
import {each} from "chart.js/helpers";
import EventBarChart from "../components/EventBarChart";

const qrCodeAPI = new QRCodeAPI();
const eventAPI = new EventAPI();


function AdminEventDetailPage(props) {
    const [registeredUsers, setRegisteredUsers] = useState<QRCodeModel[]>([]);

    let userDateData = [{
        creationDate: "25.08.11",
        dateCounter: 1
    }]

    useEffect(() => {
        console.log("USE EFFECT CALISTI")
        qrCodeAPI.getAll().then((resp) => {
            setRegisteredUsers(resp
                    .filter((each) => {
                        if (each.eventId.toString() === props.match.params.eventId.toString()) {

                            // if (userDateData.length < resp.length) {
                            //     let isMatched = false;
                            //     userDateData.map((eachRegister) => {
                            //
                            //         // @ts-ignore
                            //         if (eachRegister.registerDate === each.creationDate) {
                            //             // @ts-ignore
                            //             eachRegister.dateCounter++;
                            //             isMatched = true;
                            //         }
                            //
                            //     })
                            //     if (!isMatched) {
                            //         // @ts-ignore
                            //         userDateData.push({registerDate: each.creationDate, dateCounter: 1})
                            //     }
                            //
                            //
                            //     // })
                            //     // @ts-ignore
                            //
                            // }

                            //
                            // // if (_.findWhere(userDateData, {registerDate: each.creationDate, dateCounter: 0}) == null)
                            // // if (userDateData.findIndex({registerDate: each.creationDate, dateCounter: 0}))
                            // // @ts-ignore
                            // if (userDateData.indexOf({registerDate: each.creationDate}) === -1) {
                            //     //
                            //
                            //     // @ts-ignore
                            //     userDateData.push({registerDate: each.creationDate, dateCounter: 0})
                            //
                            // } else {
                            //     console.log("BU ELEMENT ZATEN VAR..")
                            // }
                            return 1
                        } else return 0

                    })
                // .map((each) => {
                //     if (userDateData.indexOf({registerDate: each.creationDate, dateCounter: 0}) === -1) {
                //         // @ts-ignore
                //         userDateData.push({registerDate: each.creationDate, dateCounter: 0})
                //
                //     } else {
                //         console.log("BU ELEMENT ZATEN VAR..")
                //     }
                // })
            )

        })

    }, [])

    // if (userDateData.length < registeredUsers.length) {
    //     registeredUsers.map((each) => {
    //         let isMatched = false;
    //         userDateData.map((eachRegister) => {
    //             if (eachRegister.registerDate.toString() === each.creationDate.toString()) {
    //                 // @ts-ignore
    //                 eachRegister.dateCounter++;
    //                 isMatched = true;
    //             }
    //
    //         })
    //         if (!isMatched) {
    //             // @ts-ignore
    //             userDateData.push({registerDate: each.creationDate, dateCounter: 1})
    //         }
    //
    //         // // @ts-ignore
    //         // if (userDateData.indexOf({registerDate: each.creationDate, dateCounter: 1}) < 0) {
    //         //     // @ts-ignore
    //         //     userDateData.push({registerDate: each.creationDate, dateCounter: 1})
    //         // }
    //
    //     })
    //     // @ts-ignore
    //
    //     userDateData.shift()
    // }

    return (
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
                            eventData={userDateData}
                            XKey="registerDate"
                            barKey="dateCounter"
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
                <caption>List of userSZ</caption>
                <thead>
                <tr>
                    <th>T.C. No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Registered Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    registeredUsers
                        .map((each) =>
                            <tr key={`${each.userTcNo}`}>
                                <td>{each.userTcNo}</td>
                                <td>{each.firstName}</td>
                                <td>{each.lastName}</td>
                                <td>{each.creationDate}</td>
                            </tr>
                        )
                }


                </tbody>
            </Table>

        </div>
    )
        ;
}

export default AdminEventDetailPage;