package al.uys.project_demo.Events.controllers.responses;

import al.uys.project_demo.Events.controllers.requests.AddLocationRequest;
import al.uys.project_demo.Events.models.Event;
import lombok.Getter;

@Getter
public class EventResponse {
  private final Long id;
  private final String eventName;
  private final String startDate;
  private final String endDate;
  private final boolean eventStatus;
  private final int quota;
  private final LocationResponse location;

  public EventResponse(Event event) {
    this.id = event.getId();
    this.eventName = event.getEventName();
    this.startDate = event.getEventStartDate().toString();
    this.endDate = event.getEventEndDate().toString();
    this.quota = event.getQuotas();
    this.eventStatus = event.getEventStatus();
    this.location = new LocationResponse(event.getLocation());
  }
}
