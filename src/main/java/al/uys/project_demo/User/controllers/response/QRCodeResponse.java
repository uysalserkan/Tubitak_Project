package al.uys.project_demo.User.controllers.response;

import al.uys.project_demo.User.models.QRCode;

public class QRCodeResponse {

  private final Long eventId;
  private final String eventName;
  private final Long userId;
  private final String userTcNo;

  public QRCodeResponse(final QRCode qrCode) {
    this.eventId = qrCode.getEventId();
    this.eventName = qrCode.getEventName();
    this.userId = qrCode.getUserId();
    this.userTcNo = qrCode.getUserTcNo();
  }
}
