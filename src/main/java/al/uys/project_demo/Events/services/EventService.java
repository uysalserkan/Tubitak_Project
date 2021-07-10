package al.uys.project_demo.Events.services;

import al.uys.project_demo.Events.controllers.requests.AddEventRequest;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.repositories.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
  private final EventRepository eventRepository;

  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public List<Event> getAllEvents() {
    return eventRepository.findAll();
  }

  public Event addEvent(AddEventRequest event) {
    eventRepository.save(event.toEvent());
    return event.toEvent();
  }
}
