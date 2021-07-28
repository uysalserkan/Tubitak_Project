import React from "react";
import moment from "moment";
import EventCard from "../components/EventCard";

function RegisteredEventsPage(props) {
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
    )
}

export default RegisteredEventsPage;