import {LocationModel} from "./LocationModel";
import {EventCategory} from "../enums/EventCategory";

export interface EventModel {
    eventName: String;
    startDate: String;
    endDate: String;
    eventStatus: boolean;
    quota: number;
    location: String;
    eventCategory: EventCategory;

    /*
  * private final Long id;
  * private final String eventName;
  * private final String startDate;
  * private final String endDate;
  * // private final boolean eventStatus;
  * private final int quota;
  * private final LocationResponse location;
  * private final EventCategory eventCategory;
    */
}