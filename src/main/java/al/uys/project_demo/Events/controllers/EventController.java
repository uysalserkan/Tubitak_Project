package al.uys.project_demo.Events.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Events.controllers.requests.AddEventRequest;
import al.uys.project_demo.Events.controllers.requests.UpdateEventRequest;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.services.EventService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/*
 * Tüm bağlantılar `http://localhost:8080/events` üzerinden gerçekleşiyor.
 * 1. GET `/` ile tüm Eventlerin bilgilerini EventResponse modeli ile alırız.
 * 2. GET `/id` ile id numarası girilmiş Event hakkında EventResponse modeli üzerinden bilgilerini alırız.
 * 3. POST `/` ile JSON formatında EventRequest modeli üzerinden veri tabanımıza göndeirlen event'i kayıt ederiz.
 * 4. PUT `/id` ile id numarası girilmiş olan Eventi JSON olarak gelen EventRequest ile güncelleyip veri tabanına kayıt ederiz.
 * 5. DELETE `/id` ile id numarası verilmiş olan Event'i veri tabanından sileriz.
 */

@RestController
@CrossOrigin
@RequestMapping(value = "events")
@Validated
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
    return eventService.addEvent(event.toEvent());
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
