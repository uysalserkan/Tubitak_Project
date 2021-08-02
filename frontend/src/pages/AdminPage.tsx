import {AuthAPI} from "../api/AuthAPI";
import jwt from "jwt-decode";
import {QRCodeAPI} from "../api/QRCodeAPI";
import {EventAPI} from "../api/EventAPI";
import React, {useMemo, useState} from "react";
import {QRCodeModel} from "../api/models/QRCodeModel";

import {Button, Table} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {MessageType} from "../dto/MessageResponse";
import {AdminEventDetailsModal} from "../components/Modals/AdminEventDetailsModal";

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
    const [registeredData, setRegisteredData] = useState<QRCodeModel[]>([]);
    const [adminDetailsModalIsOpen, setAdminDetailsModalIsOpen] = useState(false);

    useMemo(() => {
        qrCodeAPI.getAll().then(data => {
            setRegisteredData(data)
        })
    }, [])

    return adminName === "" ? setTimeout(() => {
        window.location.replace("/")
    }) : <div
        className="d-flex flex-xl-wrap align-items-center align-middle"
        style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
    >
        <h1 className="text-primary"> ADMİN PAGE</h1>
        <Table striped hover borderless variant="dark">
            <caption>List of registered users</caption>
            <thead>
            <tr>
                <th className="col-1"/>
                <th>Event Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>T.C. Number</th>
            </tr>
            </thead>
            <tbody>
            {
                registeredData
                    .sort(
                        // @ts-ignore
                        (a, b) => {
                            return (a.eventId >= b.eventId) ? a : b
                        })
                    .map(
                        (each) => <tr key={`${each.eventId}_${each.userTcNo}`}>
                            <td><Button
                                onClick={() => {
                                    // TODO: Burada map ile dğeil de route olarak details sayfasına bakılacak.
                                    console.log(each.eventName, each.eventId)
                                    setAdminDetailsModalIsOpen(true)

                                }}
                            >Details</Button>
                                <AdminEventDetailsModal
                                    isOpen={adminDetailsModalIsOpen}
                                    handleClose={() => setAdminDetailsModalIsOpen(false)}
                                    eventId={each.eventId}
                                    eventName={each.eventName}
                                />
                            </td>
                            <td>{each.eventName}</td>
                            <td>{each.firstName}</td>
                            <td>{each.lastName}</td>
                            <td>{each.userTcNo}</td>
                            {/*<td><Button variant="danger" onClick={() => {*/}
                            {/*    qrCodeAPI.deleteByTcNoAndEventId(each.userTcNo, each.eventId).then((response) => {*/}
                            {/*        if (response.messageResponseType === MessageType.SUCCESS) {*/}
                            {/*            toast.success(`${response.message}`, {*/}
                            {/*                    position: "top-right",*/}
                            {/*                    autoClose: 5000,*/}
                            {/*                    hideProgressBar: false,*/}
                            {/*                    closeOnClick: true,*/}
                            {/*                    pauseOnHover: false,*/}
                            {/*                    draggable: true,*/}
                            {/*                    progress: undefined,*/}
                            {/*                }*/}
                            {/*            )*/}
                            {/*        } else {*/}
                            {/*            toast.warn(`${response.message}`, {*/}
                            {/*                    position: "top-right",*/}
                            {/*                    autoClose: 5000,*/}
                            {/*                    hideProgressBar: false,*/}
                            {/*                    closeOnClick: true,*/}
                            {/*                    pauseOnHover: false,*/}
                            {/*                    draggable: true,*/}
                            {/*                    progress: undefined,*/}
                            {/*                }*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    }).catch((err) => {*/}
                            {/*        toast.error(`${err}`, {*/}
                            {/*                position: "top-right",*/}
                            {/*                autoClose: 5000,*/}
                            {/*                hideProgressBar: false,*/}
                            {/*                closeOnClick: true,*/}
                            {/*                pauseOnHover: false,*/}
                            {/*                draggable: true,*/}
                            {/*                progress: undefined,*/}
                            {/*            }*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}
                            {/*}>Remove</Button></td>*/}
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
                        </tr>
                    )
            }
            </tbody>

        </Table>

        {/*<BootstrapTable*/}
        {/*    className="table-dark"*/}
        {/*    bootstrap4*/}
        {/*    keyField="-"*/}
        {/*    data={registeredData}*/}
        {/*    columns={columns}*/}
        {/*    pagination={paginationFactory({sizePerPage: 5})}*/}
        {/*/>*/}
        {/*{*/}
        {/*    registeredData.map(each => {*/}
        {/*        console.log(each)*/}
        {/*    })*/}
        {/*}*/}
    </div>;
}