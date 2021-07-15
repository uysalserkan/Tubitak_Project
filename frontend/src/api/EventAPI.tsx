import {EventCategory} from "./enums/EventCategory";
import {EventModel} from "./models/EventModel";
import axios from "axios";

export interface LocationResponse {
    latitude: String;
    longtitude: String;
}

export interface EventQueryResponse {
    id: number;
    eventName: String;
    startDate: String;
    endDate: String;
    eventStatus: boolean;
    quota: number;
    location: LocationResponse;
    eventCategory: EventCategory;

}

export class EventAPI {
    async getEvent(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("http://localhost:8080/events");
        return response.data;
    }
}