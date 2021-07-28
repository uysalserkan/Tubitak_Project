package al.uys.project_demo.User.services;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.repositories.EventRepository;
import al.uys.project_demo.User.controllers.request.AddQRCodeRequest;
import al.uys.project_demo.User.controllers.request.AddUserRequest;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.models.QRCode;
import al.uys.project_demo.User.models.User;
import al.uys.project_demo.User.repositories.QRCodeRepository;
import al.uys.project_demo.User.repositories.UserRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {
  private final EventRepository eventRepository;
  private final QRCodeRepository qrCodeRepository;
  private final UserRepository userRepository;

  public UserService(
      EventRepository eventRepository,
      QRCodeRepository qrCodeRepository,
      UserRepository userRepository) {
    this.eventRepository = eventRepository;
    this.qrCodeRepository = qrCodeRepository;
    this.userRepository = userRepository;
  }

  @Transactional
  public MessageResponse registerUserToEvent(Long eventId, AddUserRequest addUserRequest) {
    if (!eventRepository.existsById(eventId)) {
      return new MessageResponse(
          "Event couldn't find with %d id number".formatted(eventId), MessageResponseType.ERROR);
    }

    Event event = eventRepository.getById(eventId);

    // TODO: Eventler o an için iptal olmuş olabilir, ondan dolayı bu fonksiyonu daha sonra
    // kullanıma açabiliriz fakat şimdilik kapalı duracak.
    //    if (!event.getEventStatus()) {
    //      return new MessageResponse(
    //          "%s Eventi şu anda başvuru yapılabilir değildir (status=false), lütfen daha sonra
    // tekrar deneyiniz.."
    //              .formatted(event.getEventName()),
    //          MessageResponseType.ERROR);
    //    }

    if (event.getEventEndDate().isBefore(LocalDate.now())) {
      return new MessageResponse(
          "%s event is passed".formatted(event.getEventName()), MessageResponseType.ERROR);
    }

    if (!userRepository.existsByTcNo(addUserRequest.getTcNo())) {
      return new MessageResponse(
          "User didn't found with %s T.C. number".formatted(addUserRequest.getTcNo()),
          MessageResponseType.ERROR);
    }

    User user = userRepository.findByTcNo(addUserRequest.getTcNo());

    if (qrCodeRepository.existsByUserTcNoAndEventId(user.getTcNo(), eventId)) {
      return new MessageResponse(
          "User is already registered at %s the event with %s T.C. number"
              .formatted(event.getEventName(), addUserRequest.getTcNo()),
          MessageResponseType.ERROR);
    }

    AddQRCodeRequest registerUserToEvent =
        new AddQRCodeRequest(
            event.getId(),
            event.getEventName(),
            user.getFirstName(),
            user.getLastName(),
            user.getTcNo());

    user.addQRCode(registerUserToEvent.toQRCode());

    if (event.isQuotaFull()) {
      return new MessageResponse(
          "%s does not have any acceptable quota, please try again later"
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    } else {
      event.addAttandee();
    }

    userRepository.save(user);
    eventRepository.save(event);

    return new MessageResponse(
        "User is registered wiht %s T.C. number at %s event"
            .formatted(user.getTcNo(), event.getEventName()),
        MessageResponseType.SUCCESS);
  }

  public MessageResponse addUser(AddUserRequest user) {
    if (userRepository.existsByTcNo(user.getTcNo())) {
      return new MessageResponse(
          "%s T.C. number is already used by another user, please try to login"
              .formatted(user.getTcNo()),
          MessageResponseType.ERROR);
    }

    userRepository.save(user.toUser());
    return new MessageResponse(
        "%s %s, you are registered with %s T.C. number"
            .formatted(user.getFirstName(), user.getLastName(), user.getTcNo()),
        MessageResponseType.SUCCESS);
  }

  public UserResponse getUserWithTCNo(String tcNo) {
    if (!userRepository.existsByTcNo(tcNo)) {
      throw new EntityNotFoundException(
          "%s T.C. number is not linked any user, please register".formatted(tcNo));
    }
    User user = userRepository.findByTcNo(tcNo);
    return new UserResponse(user);
  }

  public List<UserResponse> getAllUsers() {
    return userRepository.findAll().stream().map(usr -> new UserResponse(usr)).toList();
  }
}
