import {EventCategory} from "./enums/EventCategory";
import {EventModel} from "./models/EventModel";
import axios from "axios";
import {MessageResponse} from "../dto/MessageResponse";

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

    async getEventById(id: number): Promise<EventQueryResponse> {
        const response = await axios.get<EventQueryResponse>(`http://localhost:8080/events/${id}`)
        return response.data;
    }

    async updateEventById(id: number): Promise<EventQueryResponse> {
        const response = await axios.put(`http://localhost:8080/events/${id}`)
        return response.data;
    }

    async deleteEventById(id: number): Promise<EventQueryResponse> {
        const response = await axios.delete(`http://localhost:8080/events/${id}`)
        return response.data;
    }

    async postEvent(eventModel: EventModel): Promise<MessageResponse> {
        const response = await axios.post("http://localhost:8080/events", eventModel);
        return response.data;
    }
}