import {EventCategory} from "./enums/EventCategory";
import {EventModel} from "./models/EventModel";
import axios from "axios";
import {MessageResponse} from "../dto/MessageResponse";
import {AuthAPI} from "./AuthAPI";
import LoginPage from "../pages/LoginPage";

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

const authAPI = new AuthAPI();

export class EventAPI {

    async getEvent(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("http://localhost:8080/events");
        return response.data;
    }

    async getEventById(id: number): Promise<EventQueryResponse> {
        const response = await axios.get<EventQueryResponse>(`http://localhost:8080/events/${id}`)
        return response.data;
    }

    async updateEventById(id: number, eventModel: EventModel): Promise<MessageResponse> {
        const token = authAPI.getToken();
        eventModel.eventStatus = true;
        const response = await axios.put(`http://localhost:8080/events/${id}`, eventModel,
            {
                headers: authAPI.getHeader()
            })

        return response.data;
    }

    async deleteEventById(id: number): Promise<MessageResponse> {
        const token = authAPI.getToken();
        const response = await axios.delete(`http://localhost:8080/events/${id}`,
            {
                headers: authAPI.getHeader()
            })
        return response.data;
    }

    async postEvent(eventModel: EventModel): Promise<MessageResponse> {
        eventModel.eventStatus = true;

        const response = await axios.post("http://localhost:8080/events", eventModel,
            {
                headers: authAPI.getHeader()
            });

        return response.data;
    }
}