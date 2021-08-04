package al.uys.project_demo.User.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class QRCode {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long eventId;

  private String eventName;

  private String firstName;
  private String lastName;

  private String userTcNo;

  @CreationTimestamp private LocalDate creationDate;

  public QRCode(
      Long eventId, String eventName, String firstName, String lastName, String userTcNo) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userTcNo = userTcNo;
  }

  protected QRCode() {}
}
