package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.QRCode;

public class AddQRCodeRequest {
  private final Long eventId;
  private final String eventName;
  private final Long userId;
  private final String userTcNo;

  public AddQRCodeRequest(Long eventId, String eventName, Long userId, String userTcNo) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.userId = userId;
    this.userTcNo = userTcNo;
  }

  public QRCode toQRCode() {
    return new QRCode(eventId, eventName, userId, userTcNo);
  }
}
