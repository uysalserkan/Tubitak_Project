package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.services.QRCodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;

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

  @GetMapping
  public ResponseEntity<String> getstring() {
    return ResponseEntity.ok("bişiler");
  }
}
