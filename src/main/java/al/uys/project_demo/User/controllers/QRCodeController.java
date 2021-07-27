package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.services.QRCodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.awt.image.BufferedImage;
import java.io.IOException;

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
  public MessageResponse sendMail(@RequestParam Long eventId, @RequestParam String tcno, @RequestParam String email)
      throws MessagingException, IOException {
    return qrCodeService.sendMail(eventId, tcno,email);
  }
}
