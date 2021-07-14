package al.uys.project_demo.Events.controllers.requests;

import al.uys.project_demo.Events.enums.EventCategory;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.models.Location;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
@RequiredArgsConstructor
public class AddEventRequest {
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

  //  @NotEmpty(message = "Etkinlik categorisinden en az 1 tane seçmelisiniz..")
  private final String eventCategory;

  public Event toEvent() {
    return new Event(
        eventName,
        eventStatus,
        LocalDate.parse(startDate),
        LocalDate.parse(endDate),
        quota,
        location.toLocation(),
        new EventCategoryConverter(eventCategory).toEventCategory());
  }
}

/*
 * { "eventName":"TestMyEvent", "startDate":"1998-02-05", "endData":"2502-02-05",
 * "eventStatus":true, "quota":250, "location":{ "latitude":"250000", "longitude":"888.0250" } }
 */
