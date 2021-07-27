package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.QRCode;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class AddQRCodeRequest {
  @NotBlank(message = "Event ID numarasını boş bırakamazsınız.")
  private final Long eventId;

  @NotBlank(message = "Event adını boş bırakamazsınız..")
  private final String eventName;

  @NotBlank(message = "Kullanıcı firstName yeri boş bırakılamaz..")
  private final String firstName;

  @NotBlank(message = "Kullanıcı firstName yeri boş bırakılamaz..")
  private final String lastName;

  @Size(min = 11, max = 11, message = "T.C. numarası 11 haneli olmak zorundadır.")
  @NotBlank(message = "User T.C. nuramasını boş bırakamazsınız..")
  private final String userTcNo;

  public AddQRCodeRequest(
      Long eventId, String eventName, String firstName, String lastName, String userTcNo) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.userTcNo = userTcNo;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public QRCode toQRCode() {
    return new QRCode(eventId, eventName, firstName, lastName, userTcNo);
  }
}
