package al.uys.project_demo.User.services;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.services.EventService;
import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.repositories.QRCodeRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.awt.image.BufferedImage;

@Service
public class QRCodeService {
  private final QRCodeRepository qrCodeRepository;

  public QRCodeService(QRCodeRepository qrCodeRepository) {
    this.qrCodeRepository = qrCodeRepository;
  }

  public QRCodeResponse getQRCodeWithEventIdAndTcno(Long eventId, String tcNo)
      throws MessageResponse {
    if (!qrCodeRepository.existsByUserTcNo(tcNo)) {
      throw new MessageResponse(
          "Sorry, user cannot found with %s T.C. number".formatted(tcNo),
          MessageResponseType.ERROR);
    } else if (!qrCodeRepository.existsByUserTcNoAndEventId(tcNo, eventId)) {
      throw new MessageResponse("User is not registered this event", MessageResponseType.ERROR);
    }
    return new QRCodeResponse(qrCodeRepository.getQRCodeByEventIdAndUserTcNo(eventId, tcNo));
  }
}
