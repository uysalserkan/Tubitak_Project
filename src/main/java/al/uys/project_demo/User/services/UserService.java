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

    if (!userRepository.existsByTcNo(addUserRequest.getTcNo())) {
      return new MessageResponse(
          "%s ile kayıt etmeye çalıştığınız kullanıcı bulunmamaktadır."
              .formatted(addUserRequest.getTcNo()),
          MessageResponseType.ERROR);
    }

    User user = userRepository.findByTcNo(addUserRequest.getTcNo());

    if (qrCodeRepository.existsByUserTcNo(user.getTcNo())) {
      return new MessageResponse(
          "%s ile kayıt etmeye çalıştığınız kullanıcı hali hazırda bu event'e kayıtlıdır.."
              .formatted(addUserRequest.getTcNo()),
          MessageResponseType.ERROR);
    }

    AddQRCodeRequest registerUserToEvent =
        new AddQRCodeRequest(event.getId(), event.getEventName(), user.getId(), user.getTcNo());

    user.addQRCode(registerUserToEvent.toQRCode());
    userRepository.save(user);

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
