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

  // TODO: addUserRequest ayrı bir api den gelebilir. ??

  @Transactional
  public MessageResponse registerUserToEvent(Long eventId, AddUserRequest addUserRequest) {
    if (!eventRepository.existsById(eventId)) {
      return new MessageResponse(
          "%d ile aramaya çalıştığınız event bulunmamaktadır.".formatted(eventId),
          MessageResponseType.ERROR);
    }

    Event event = eventRepository.getById(eventId);

    if (!event.getEventStatus()) {
      return new MessageResponse(
          "%s Eventi şu anda başvuru yapılabilir değildir (status=false), lütfen daha sonra tekrar deneyiniz.."
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    if (event.getEventEndDate().isBefore(LocalDate.now())) {
      return new MessageResponse(
          "%s Eventinin tarihi geçtiği için başvuru yapamazsınız..".formatted(event.getEventName()),
          MessageResponseType.ERROR);
    }

    if (!userRepository.existsByTcNo(addUserRequest.getTcNo())) {
      return new MessageResponse(
          "%s ile kayıt etmeye çalıştığınız kullanıcı bulunmamaktadır."
              .formatted(addUserRequest.getTcNo()),
          MessageResponseType.ERROR);
    }

    User user = userRepository.findByTcNo(addUserRequest.getTcNo());

    if (qrCodeRepository.existsByUserTcNoAndEventId(user.getTcNo(), eventId)) {
      return new MessageResponse(
          "%s ile kayıt etmeye çalıştığınız kullanıcı hali hazırda %s event'e kayıtlıdır.."
              .formatted(addUserRequest.getTcNo(), event.getEventName()),
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
          "%s Eventinin kontenjanı dolmuştur, event'den bir kullanıcının çıkması durumunda tekrar başvuru yapabilirsiniz.."
              .formatted(event.getEventName()),
          MessageResponseType.ERROR);
    } else {
      event.addAttandee();
    }

    userRepository.save(user);
    eventRepository.save(event);

    return new MessageResponse(
        "%s TC numarasına sahip olan kullanıcı %s Event'ine kayıt edildi."
            .formatted(user.getTcNo(), event.getEventName()),
        MessageResponseType.SUCCESS);
  }

  public MessageResponse addUser(AddUserRequest user) {
    if (userRepository.existsByTcNo(user.getTcNo())) {
      return new MessageResponse(
          "%s T.C. numarasına sahip kullanıcı hali hazırda sistemde kayıtlı bulunuyor, lütfen giriş yapmayı deneyiniz.."
              .formatted(user.getTcNo()),
          MessageResponseType.ERROR);
    }

    userRepository.save(user.toUser());
    return new MessageResponse(
        "%s T.C. numarasına sahip %s %s kullanıcı sisteme kayıt edildi..."
            .formatted(user.getTcNo(), user.getFirstName(), user.getLastName()),
        MessageResponseType.SUCCESS);
  }

  public UserResponse getUserWithTCNo(String tcNo) {
    if (!userRepository.existsByTcNo(tcNo)) {
      throw new EntityNotFoundException(
          "%s T.C. numarasına sahip kullanıcı sistemde kayıtlı değildir, lütfen kayıt olunuz.."
              .formatted(tcNo));
    }
    User user = userRepository.findByTcNo(tcNo);
    return new UserResponse(user);
  }

  public List<UserResponse> getAllUsers() {
    return userRepository.findAll().stream().map(usr -> new UserResponse(usr)).toList();
  }
}
