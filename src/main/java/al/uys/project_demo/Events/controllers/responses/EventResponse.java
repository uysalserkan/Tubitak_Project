package al.uys.project_demo.Events.controllers.responses;

import al.uys.project_demo.Events.enums.EventCategory;
import al.uys.project_demo.Events.models.Event;
import lombok.Getter;

import java.util.StringJoiner;

@Getter
public class EventResponse {
  private final Long id;
  private final String eventName;
  private final String startDate;
  private final String endDate;
  private final boolean eventStatus;
  private final int quota;
  private final LocationResponse location;
  private final EventCategory eventCategory;

  public EventResponse(Event event) {
    this.id = event.getId();
    this.eventName = event.getEventName();
    this.startDate = event.getEventStartDate().toString();
    this.endDate = event.getEventEndDate().toString();
    this.quota = event.getQuotas();
    this.eventStatus = event.getEventStatus();
    this.location = new LocationResponse(event.getLocation());
    this.eventCategory = event.getEventCategory();
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", EventResponse.class.getSimpleName() + "[", "]")
        .add("id=" + id)
        .add("eventName='" + eventName + "'")
        .add("startDate='" + startDate + "'")
        .add("endDate='" + endDate + "'")
        .add("eventStatus=" + eventStatus)
        .add("quota=" + quota)
        .add("location=" + location)
        .add("eventCategory=" + eventCategory)
        .toString();
  }
}
