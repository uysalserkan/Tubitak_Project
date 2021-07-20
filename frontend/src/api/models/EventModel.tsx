import {EventCategory} from "../enums/EventCategory";

export interface EventModel {
    eventName: String;
    startDate: String;
    endDate: String;
    eventStatus: boolean;
    quota: number;
    location: {
        latitude: String;
        longtitude: String;
    };
    eventCategory: EventCategory;

}