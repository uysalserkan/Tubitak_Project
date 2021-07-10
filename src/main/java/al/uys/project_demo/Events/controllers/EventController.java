package al.uys.project_demo.Events.controllers;

import al.uys.project_demo.Events.controllers.requests.AddEventRequest;
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
  public List<Event> getAllEvents() {
    return eventService.getAllEvents();
  }

  @PostMapping
  public Event postEvent(@Valid @RequestBody AddEventRequest event) {
    return eventService.addEvent(event);
  }
}
