package al.uys.project_demo.User.controllers.response;

import al.uys.project_demo.User.models.QRCode;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class QRCodeResponse {

  private final Long eventId;
  private final String eventName;
  private final String firstName;
  private final String lastName;
  private final String userTcNo;
  private final LocalDate creationDate;

  public QRCodeResponse(final QRCode qrCode) {
    this.eventId = qrCode.getEventId();
    this.eventName = qrCode.getEventName();
    this.firstName = qrCode.getFirstName();
    this.lastName = qrCode.getLastName();
    this.userTcNo = qrCode.getUserTcNo();
    this.creationDate = qrCode.getCreationDate();
  }

  public String toString() {
    return ("{"
            + "\"eventId\":%d,"
            + "\"eventName\":\"%s\","
            + "\"firstName\":\"%s\","
            + "\"lastName\":\"%s\","
            + "\"userTcNo\":\"%s\","
            + " \"creationDate\":\"%s\""
            + "}")
        .formatted(eventId, eventName, firstName, lastName, userTcNo, creationDate.toString());
  }
}
