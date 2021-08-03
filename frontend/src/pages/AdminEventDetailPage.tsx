import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI} from "../api/EventAPI";
import React, {useMemo, useState} from "react";
import {QRCodeModel} from "../api/models/QRCodeModel";
import {Table} from "react-bootstrap";

const qrCodeAPI = new QRCodeAPI();
const eventAPI = new EventAPI();

// TODO: filtreleme işlemleri burada yapılıyor fakat api üzerinden direkt olarak eventId ile tüm kullanıcıları getirebilirdik.


function AdminEventDetailPage(props) {
    const [registeredUsers, setRegisteredUsers] = useState<QRCodeModel[]>([]);

    useMemo(() => {
        qrCodeAPI.getAll().then((resp) => {
            setRegisteredUsers(resp
                .filter((each) => {
                    if (each.eventId == props.match.params.eventId)
                        return 1
                    else return 0
                })
            )
        })
    }, [])


    return (
        <div

            className="d-flex flex-xl-wrap align-items-center align-middle"
            style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
        >

            <Table striped hover borderless variant="dark" id="eventTable">
                <caption>List of userSZ</caption>
                <thead>
                <tr>
                    <th>T.C. No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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