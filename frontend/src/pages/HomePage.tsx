import React, {useEffect, useState} from "react";
import {EventAPI, EventQueryResponse} from "../api/EventAPI";
import EventCard from "../components/EventCard";

function HomePage(props) {
    const [eventModelResponse, setEventModelResponse] = useState<EventQueryResponse[]>([]);
    const eventAPI = new EventAPI();


    useEffect(() => {
        eventAPI.getEvent().then(data => setEventModelResponse(data));
    }, [])


    return (

        <div
            className="d-flex flex-xl-wrap align-items-center align-middle"
            style={{marginLeft: "16px", marginTop: "16px", alignContent: "center"}}
        >

            {eventModelResponse.map(each =>
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

    );
}


export default HomePage;

