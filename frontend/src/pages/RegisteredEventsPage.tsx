import React, {useEffect, useMemo, useState} from "react";
// import {Form} from "react-bootstrap";
// import {QRCodeAPI} from "../api/QRCodeAPI";
// import {EventQueryResponse} from "../api/EventAPI";
// import {toast} from "react-toastify";
import moment from "moment";
import EventCard from "../components/EventCard";

function RegisteredEventsPage(props) {


    // const [registeredEvents, setRegisteredEvents] = useState<EventQueryResponse[]>([]);
    // const qrCodeAPI = new QRCodeAPI();


    // useEffect(() => {
    //     if (props.isClicked) {
    //         qrCodeAPI.getAllEventRegistered(props.tcno).then(
    //             (response) => {
    //                 if (response) {
    //                     setRegisteredEvents(response);
    //                     console.log("buradayız")
    //                     // props.setClicked(false)
    //                 } else {
    //                     toast.warning(`bişiler oldu.`, {
    //                             position: "top-right",
    //                             autoClose: 5000,
    //                             hideProgressBar: false,
    //                             closeOnClick: true,
    //                             pauseOnHover: false,
    //                             draggable: true,
    //                             progress: undefined,
    //                         }
    //                     );
    //                     console.log("else içi")
    //                 }
    //             }
    //         ).catch((err) => {
    //             toast.error(`${err}`, {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     progress: undefined,
    //                 }
    //             );
    //             console.log("catch içi")
    //             console.log(props.isClicked)
    //         });
    //     }
    // }, [props.isClicked])
    //
    // useMemo(() => {
    //     if (props.isClicked) {
    //         qrCodeAPI.getAllEventRegistered(props.tcno).then(
    //             (response) => {
    //                 if (response) {
    //                     setRegisteredEvents(response);
    //                     console.log("buradayız")
    //                     // props.setClicked(false)
    //                 } else {
    //                     toast.warning(`bişiler oldu.`, {
    //                             position: "top-right",
    //                             autoClose: 5000,
    //                             hideProgressBar: false,
    //                             closeOnClick: true,
    //                             pauseOnHover: false,
    //                             draggable: true,
    //                             progress: undefined,
    //                         }
    //                     );
    //                     console.log("else içi")
    //                 }
    //             }
    //         ).catch((err) => {
    //             toast.error(`${err}`, {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     progress: undefined,
    //                 }
    //             );
    //             console.log("catch içi")
    //             console.log(props.isClicked)
    //         });
    //     }
    // }, [])

    // useEffect(() => {
    //     if (!props.fetched) {
    //         props.fetchRules();
    //     }
    //     console.log('mount it!');
    // }, [])

    // const componentDidMount = () => {
    //     if (!props.fetched) {
    //         props.fetchRules();
    //     }
    //     console.log('mount it!');
    // };

    return (
        <div
            className="d-flex flex-xl-wrap align-items-center align-middle"
            style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
        >

            {props.registeredEvents
                .filter(each => {
                    const inDate = (moment(new Date()).format("YYYY-MM-DD"))
                    return each.endDate > inDate;
                }).map(each =>
                    <div key={each.id}
                         className="align-content-center"
                         style={{marginRight: "16px", marginBottom: "16px"}}
                    >
                        <EventCard
                            eventName={each.eventName}
                            startDate={each.startDate}
                            endDate={each.endDate}
                            eventCategory={each.eventCategory}
                            eventStatus={each.eventStatus}
                            quota={each.quota}
                            id={each.id}
                            location={each.location}
                        />
                    </div>
                )}
        </div>
        // <div>
        //     <h1>
        //         `${props.tcno}`
        //     </h1>
        //     <Form.Text>
        //         asdasd
        //
        //     </Form.Text>
        // </div>
    )
}

export default RegisteredEventsPage;