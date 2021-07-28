package al.uys.project_demo.Events.controllers.requests;

import al.uys.project_demo.Events.enums.EventCategory;
import al.uys.project_demo.Events.models.Event;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
@RequiredArgsConstructor
public class UpdateEventRequest {
  @Size(max = 255, min = 5, message = "Event name have to between include 5-255 characters")
  private final String eventName;

  @NotEmpty(message = "You cannot blank start date")
  private final String startDate;

  @NotEmpty(message = "You cannot blank end date")
  private final String endDate;

  //  @NotEmpty(message = "Etkinlik durumunu boş bırakamazsınız. true/false ?")
  private final boolean eventStatus;

  @Min(value = 5, message = "You have to give minimum 5 quota")
  private final int quota;

  //  @NotBlank(message = "EEEEEE")
  private final AddLocationRequest location;

  //  @NotEmpty(message = "You cannot blank eventCategory")
  private final EventCategory eventCategory;

  public Event toEvent() {
    return new Event(
        eventName,
        eventStatus,
        LocalDate.parse(startDate),
        LocalDate.parse(endDate),
        quota,
        location.toLocation(),
        eventCategory);
  }
}
