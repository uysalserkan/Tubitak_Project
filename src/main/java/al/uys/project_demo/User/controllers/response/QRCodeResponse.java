package al.uys.project_demo.User.controllers.response;

import al.uys.project_demo.User.models.QRCode;
import lombok.Getter;

@Getter
public class QRCodeResponse {

  private final Long eventId;
  private final String eventName;
  private final String firstName;
  private final String lastName;
  private final String userTcNo;

  public QRCodeResponse(final QRCode qrCode) {
    this.eventId = qrCode.getEventId();
    this.eventName = qrCode.getEventName();
    this.firstName = qrCode.getFirstName();
    this.lastName = qrCode.getLastName();
    this.userTcNo = qrCode.getUserTcNo();
  }

  public String toString() {
    return ("{"
            + "\"eventId\":%d,"
            + "\"eventName\":\"%s\","
            + "\"firstName\":\"%s\","
            + "\"lastName\":\"%s\","
            + "\"userTcNo\":\"%s\""
            + "}")
        .formatted(eventId, eventName, firstName, lastName, userTcNo);
  }
}
