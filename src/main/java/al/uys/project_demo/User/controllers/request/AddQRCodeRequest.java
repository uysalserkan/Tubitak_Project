package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.QRCode;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class AddQRCodeRequest {
  @NotBlank(message = "You cannot blank event id")
  private final Long eventId;

  @NotBlank(message = "You cannot blank event name")
  private final String eventName;

  @NotBlank(message = "You cannot blank firstname")
  private final String firstName;

  @NotBlank(message = "You cannot blank lastname")
  private final String lastName;

  @Size(min = 11, max = 11, message = "You have to enter a valid T.C. number")
  @NotBlank(message = "You cannot blank T.C. number")
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
