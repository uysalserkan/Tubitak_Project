package al.uys.project_demo.Events.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Events.controllers.requests.AddEventRequest;
import al.uys.project_demo.Events.controllers.requests.UpdateEventRequest;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.services.EventService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "events")
public class EventController {

  private final EventService eventService;

  public EventController(EventService eventService) {
    this.eventService = eventService;
  }

  @GetMapping
  public List<EventResponse> getAllEvents() {
    return eventService.getAllEvents().stream().map(event -> new EventResponse(event)).toList();
  }

  @GetMapping("/{id}")
  public EventResponse getEvent(@PathVariable Long id) {
    return eventService.getEvent(id);
  }

  @PostMapping
  public MessageResponse postEvent(@Valid @RequestBody AddEventRequest event) {
    return eventService.addEvent(event);
  }

  @PutMapping("/{id}")
  public MessageResponse putEvent(
      @Valid @RequestBody UpdateEventRequest updatedEvent, @PathVariable Long id) {
    return eventService.updateEvent(updatedEvent, id);
  }

  @DeleteMapping("/{id}")
  public MessageResponse deleteEvent(@PathVariable Long id) {
    return eventService.deleteEvent(id);
  }
}
