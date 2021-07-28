package al.uys.project_demo.Events.services;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import al.uys.project_demo.Events.controllers.requests.UpdateEventRequest;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.repositories.EventRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
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

  public MessageResponse addEvent(Event event) {
    if (LocalDate.parse(event.getEventStartDate().toString())
        .isAfter(LocalDate.parse(event.getEventEndDate().toString()))) {
      return new MessageResponse(
          "Start Date have to be before the End Date", MessageResponseType.ERROR);
    }

    try {

      eventRepository.save(event);
      return new MessageResponse(
          "%s is added".formatted(event.getEventName()), MessageResponseType.SUCCESS);
    } catch (Exception e) {
      return new MessageResponse(e.toString(), MessageResponseType.ERROR);
    }
  }

  public MessageResponse updateEvent(UpdateEventRequest updatedEvent, Long id) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "Event didn't found with %d ID number".formatted(id)));
    if (!event.getEventStartDate().isAfter(LocalDate.now())) {
      return new MessageResponse(
          "You cannot update %s, because the event is passed".formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    if (event.getEventStartDate().isAfter(event.getEventEndDate())) {
      return new MessageResponse(
          "You cannot update with an end date before the start date"
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    event.updateEvent(updatedEvent.toEvent());

    eventRepository.save(event);

    return new MessageResponse(
        "%s is updated".formatted(event.getEventName()), MessageResponseType.SUCCESS);
  }

  public MessageResponse deleteEvent(Long id) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "Event didn't found with %d ID number".formatted(id)));
    if (!event.getEventEndDate().isAfter(LocalDate.now())) {
      return new MessageResponse(
          "You cannot delete the %s event, because the event is passed"
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }
    eventRepository.deleteById(id);
    return new MessageResponse(
        "%s deleted".formatted(event.getEventName()), MessageResponseType.SUCCESS);
  }

  public EventResponse getEvent(Long id) {
    if (!eventRepository.existsById(id)) {
      throw new EntityNotFoundException("Event didn't found with %d ID number.".formatted(id));
    }
    Event event = eventRepository.getById(id);
    return new EventResponse(event);
  }
}
