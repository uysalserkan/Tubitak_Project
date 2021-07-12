package al.uys.project_demo.Events.services;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import al.uys.project_demo.Events.controllers.requests.AddEventRequest;
import al.uys.project_demo.Events.controllers.requests.UpdateEventRequest;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.repositories.EventRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
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

  public MessageResponse addEvent(AddEventRequest event) {
    if (LocalDate.parse(event.getStartDate()).isAfter(LocalDate.parse(event.getEndDate()))) {
      return new MessageResponse(
          "Bir event'i başlangıç tarihi, bitiş tarihinden sonra olacak şekilde oluşturamazsınız..",
          MessageResponseType.ERROR);
    }

    try {

      eventRepository.save(event.toEvent());
    } catch (Exception e) {
      return new MessageResponse(e.toString(), MessageResponseType.ERROR);
    }
    return new MessageResponse(
        "%s adına sahip event sisteme eklendi.".formatted(event.getEventName()),
        MessageResponseType.SUCCESS);
  }

  public MessageResponse updateEvent(UpdateEventRequest updatedEvent, Long id) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "%d id'ye sahip bir event bulunamadı. Lütfen tekrar kontrol edip deneyiniz.."
                            .formatted(id)));
    if (!event.getEventStartDate().isAfter(LocalDate.now())) {
      return new MessageResponse(
          "%s adlı event'in tarihi geçtiği için güncelleme işlemini yapamazsınız.."
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    if (event.getEventStartDate().isAfter(event.getEventEndDate())) {
      return new MessageResponse(
          "%s adlı event'in başlangıç tarihi bitiş tarihinden sonra olacak şekilde güncelleyemezsiniz..."
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    event.updateEvent(updatedEvent.toEvent());

    eventRepository.save(event);

    return new MessageResponse(
        "%d ID'ye sahip olan event başarı ile güncellendi.".formatted(id),
        MessageResponseType.SUCCESS);
  }

  public MessageResponse deleteEvent(Long id) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "%d id'ye sahip bir event bulunamadı. Lütfen tekrar kontrol edip deneyiniz.."
                            .formatted(id)));
    if (!event.getEventStartDate().isAfter(LocalDate.now())) {
      return new MessageResponse(
          "%s adlı event'in tarihi geçtiği için silme işlemini yapamazsınız.."
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }
    eventRepository.deleteById(id);
    return new MessageResponse(
        "%d ID'ye sahip event silindi.".formatted(id), MessageResponseType.SUCCESS);
  }

  public EventResponse getEvent(Long id) {
    if (!eventRepository.existsById(id)) {
      throw new EntityNotFoundException(
          "%d ID numaralı event bulunamadı, lütfen kontrol edin..".formatted(id));
    }
    Event event = eventRepository.getById(id);
    return new EventResponse(event);
  }
}
