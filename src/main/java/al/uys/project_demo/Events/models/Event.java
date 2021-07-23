package al.uys.project_demo.Events.models;

import al.uys.project_demo.Events.enums.EventCategory;
import al.uys.project_demo.User.models.User;
import al.uys.project_demo.QuesAnsw.models.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@ToString
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String eventName;

  @Builder.Default private Boolean eventStatus = true;

  @CreationTimestamp private LocalDate creationDate;
  @UpdateTimestamp private LocalDate updatedDate;

  private LocalDate eventStartDate;

  private LocalDate eventEndDate;

  @Builder.Default private Integer quotas = 25;

  @Enumerated(EnumType.STRING)
  private EventCategory eventCategory;

  @Embedded private Location location;

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
      Location location,
      EventCategory eventCategory) {
    this.eventName = eventName;
    this.eventStatus = eventStatus;
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.quotas = quotas;
    this.location = location;
    this.eventCategory = eventCategory;

    // TODO: Buraya eklenecek olan soruların ataması gelecek.

  }
  // TODO: Question ekleme sistemi ya constructor üzerinden veya methodlar üzerinden implemente
  // edilecek.
  // TODO: User kayıt entegre edilecek.
  public void updateEvent(final Event newEvent) {
    this.eventName = newEvent.eventName;
    this.eventStatus = newEvent.eventStatus;
    this.eventStartDate = newEvent.eventStartDate;
    this.eventEndDate = newEvent.eventEndDate;
    this.quotas = newEvent.quotas;
    this.location = newEvent.location;
    this.eventCategory = newEvent.eventCategory;

    // TODO: Buraya eklenecek olan soruların updatesi gelecek.

  }

  public void addQuestion(Question question) {
    this.questions.add(question);
  }

  public void removeQuestion(Question question) {
    this.questions.remove(question);
  }

  public boolean isQuotaFull() {
    return this.quotas == 0;
  }

  public void addAttandee() {
    this.quotas--;
  }

  public void removeAttandee() {
    this.quotas++;
  }
}
