package al.uys.project_demo.User.services;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import al.uys.project_demo.Events.controllers.responses.EventResponse;
import al.uys.project_demo.Events.services.EventService;
import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.repositories.QRCodeRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.Hashtable;

@Service
public class QRCodeService {
  private final JavaMailSender javaMailSender;
  private final UserService userService;
  private final EventService eventService;
  private final QRCodeRepository qrCodeRepository;

  public QRCodeService(
      JavaMailSender javaMailSender,
      UserService userService,
      EventService eventService,
      QRCodeRepository qrCodeRepository) {
    this.javaMailSender = javaMailSender;
    this.userService = userService;
    this.eventService = eventService;
    this.qrCodeRepository = qrCodeRepository;
  }

  public static String GenerateQRCode(QRCodeResponse qrCodeResponse)
      throws WriterException, IOException {
    Hashtable hints = new Hashtable();
    hints.put(EncodeHintType.CHARACTER_SET, "utf-8");

    QRCodeWriter writer = new QRCodeWriter();
    BitMatrix bitMatrix =
        writer.encode(qrCodeResponse.toString(), BarcodeFormat.QR_CODE, 256, 256, hints);

    Path path =
        FileSystems.getDefault()
            .getPath(
                "./%s_%s_%s.PNG"
                    .formatted(
                        qrCodeResponse.getFirstName(),
                        qrCodeResponse.getLastName(),
                        qrCodeResponse.getEventName()));
    MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

    return "/%s_%s_%s.PNG"
        .formatted(
            qrCodeResponse.getFirstName(),
            qrCodeResponse.getLastName(),
            qrCodeResponse.getEventName());
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

  public MessageResponse sendMail(Long eventId, String tcNo, String email) {
    if (!qrCodeRepository.existsByUserTcNo(tcNo)) {
      return new MessageResponse(
          "Sorry, user cannot found with %s T.C. number".formatted(tcNo),
          MessageResponseType.ERROR);
    } else if (!qrCodeRepository.existsByUserTcNoAndEventId(tcNo, eventId)) {
      return new MessageResponse("User is not registered this event", MessageResponseType.ERROR);
    } else {
      try {
        QRCodeResponse response =
            new QRCodeResponse(qrCodeRepository.getQRCodeByEventIdAndUserTcNo(eventId, tcNo));
        String sourceName = GenerateQRCode(response);

        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        UserResponse userResponse = userService.getUserWithTCNo(tcNo);
        EventResponse eventResponse = eventService.getEvent(eventId);

        helper.setTo(email);

        helper.setSubject(
            "%s %s - %s Registiration QRCode"
                .formatted(
                    userResponse.getFirstName(),
                    userResponse.getLastName(),
                    eventResponse.getEventName()));

        helper.setText(
            "<h3>Hi %s</h3>".formatted(userResponse.getFirstName())
                + "<p>You registered at <strong><i>%s</i></strong> event, this event will be start at <strong>%s</strong>.<br\\>"
                    .formatted(eventResponse.getEventName(), eventResponse.getStartDate())
                + "You can find your QRCode at the attachment section, <u>do not forget when you come the event.</u><br\\>"
                + "<h6>See you at the event..<br\\>SZ25</h6>",
            true);

        //        System.out.println(FileSystems.getDefault().getPath("~") + sourceName);

        helper.addAttachment(
            "QRCODE.PNG",
            new FileSystemResource(new File(System.getProperty("user.dir") + sourceName)));

        javaMailSender.send(msg);

        return new MessageResponse(
            "E-mail sent to verilen email adresi..",
            MessageResponseType.SUCCESS); // TODO: düzenlenecek

      } catch (Exception e) {
        return new MessageResponse(e.toString(), MessageResponseType.ERROR);
      }
    }
  }
}
