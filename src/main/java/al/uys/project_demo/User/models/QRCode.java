package al.uys.project_demo.User.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class QRCode {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long eventId;

  @Column(nullable = false)
  private String eventName;

  @Column(nullable = false)
  private Long userId;

  @Column(nullable = false)
  private String userTcNo;

  public QRCode(Long eventId, String eventName, Long userId, String userTcNo) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.userId = userId;
    this.userTcNo = userTcNo;
  }

  protected QRCode() {}
}
