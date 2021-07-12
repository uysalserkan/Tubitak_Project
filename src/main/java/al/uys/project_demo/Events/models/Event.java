package al.uys.project_demo.Events.models;

import al.uys.project_demo.QRCodes.models.QRCode;
import al.uys.project_demo.QuesAnsw.models.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@ToString
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String eventName;

  @Builder.Default private Boolean eventStatus = true;

  @CreationTimestamp private LocalDate creationDate;
  @UpdateTimestamp private LocalDate updatedDate;

  @Column(nullable = false)
  private LocalDate eventStartDate;

  @Column(nullable = false)
  private LocalDate eventEndDate;

  @Column(nullable = false)
  @Builder.Default
  private Integer quotas = 25;

  @Embedded private Location location;

  @ManyToMany
  @JoinTable(
      name = "Event_attendees",
      joinColumns = @JoinColumn(name = "event_id"),
      inverseJoinColumns = @JoinColumn(name = "tc_no"))
  private Set<QRCode> qrCodes;

  @OneToMany(mappedBy = "event")
  private Set<Question> questions;

  // TODO: Questions modeli eklendikten sonra OneToMany ilişkisi kurulacak.

  protected Event() {}

  public Event(
      String eventName,
      Boolean eventStatus,
      LocalDate eventStartDate,
      LocalDate eventEndDate,
      Integer quotas,
      Location location) {
    this.eventName = eventName;
    this.eventStatus = eventStatus;
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.quotas = quotas;
    this.location = location;

    // TODO: Buraya eklenecek olan soruların ataması gelecek.

  }

  public void updateEvent(final Event newEvent) {
    this.eventName = newEvent.eventName;
    this.eventStatus = newEvent.eventStatus;
    this.eventStartDate = newEvent.eventStartDate;
    this.eventEndDate = newEvent.eventEndDate;
    this.quotas = newEvent.quotas;
    this.location = newEvent.location;

    // TODO: Buraya eklenecek olan soruların updatesi gelecek.

  }

  public void addQuestion(Question question) {
    this.questions.add(question);
  }

  public void addQRCode(QRCode qrCode) {
    this.qrCodes.add(qrCode);
  }
}
