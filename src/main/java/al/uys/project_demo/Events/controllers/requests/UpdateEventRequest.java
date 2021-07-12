package al.uys.project_demo.Events.controllers.requests;

import al.uys.project_demo.Events.models.Event;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@ToString
@RequiredArgsConstructor
public class UpdateEventRequest {
  @Size(
      max = 255,
      min = 5,
      message = "Girdiğiniz başlık 5 karakterden az veya 255 karakterden çok olmaaz.")
  @NotEmpty(message = "Etkinlik adını boş bırakamazsınız.")
  private final String eventName;

  @NotEmpty(message = "Etkinlik başlangıç tarihini boş bırakamazsınız.")
  private final String startDate;

  @NotEmpty(message = "Etkinlik bitiş tarihini boş bırakamazsınız.")
  private final String endDate;

  //  @NotEmpty(message = "Etkinlik durumunu boş bırakamazsınız. true/false ?")
  private final boolean eventStatus;

  @Min(value = 5, message = "En az 5 kişilik bir etkinlik oluşturmalısınız..")
  private final int quota;

  //  @NotBlank(message = "EEEEEE")
  private final AddLocationRequest location;

  public Event toEvent() {
    return new Event(
        eventName,
        eventStatus,
        LocalDate.parse(startDate),
        LocalDate.parse(endDate),
        quota,
        location.toLocation());
  }
}
