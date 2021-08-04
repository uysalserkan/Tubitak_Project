package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.services.QRCodeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/qrcode")
public class QRCodeController {
  private final QRCodeService qrCodeService;

  public QRCodeController(QRCodeService qrCodeService) {
    this.qrCodeService = qrCodeService;
  }

  @GetMapping("/{event_id}/{user_tcno}")
  public QRCodeResponse getQRCodeWithEventIdAndTcno(
      @PathVariable("event_id") Long event_id, @PathVariable("user_tcno") String user_tcno)
      throws MessageResponse {
    return qrCodeService.getQRCodeWithEventIdAndTcno(event_id, user_tcno);
  }

  @PostMapping("mail")
  public MessageResponse sendMail(
      @RequestParam Long eventId, @RequestParam String tcno, @RequestParam String email)
      throws MessagingException, IOException {
    return qrCodeService.sendMail(eventId, tcno, email);
  }

  @GetMapping("{tcno}")
  public List<EventResponse> getAllEventRegistered(@PathVariable String tcno)
      throws MessageResponse {
    return qrCodeService.getAllRegisteredEventsWithTCNumber(tcno);
  }

  @GetMapping()
  @PreAuthorize("hasRole('ADMIN')")
  public List<QRCodeResponse> getAllRegisteredEvents() {
    return qrCodeService.getAllRegisteredEvents();
  }

  @Transactional
  @DeleteMapping("/{tcno}/{eventid}")
  @PreAuthorize("hasRole('ADMIN')")
  public MessageResponse deleteRegisteredUser(
      @PathVariable String tcno, @PathVariable Long eventid) {
    return qrCodeService.deleteQRCodeWithTCNoAndEventId(tcno, eventid);
  }
}
