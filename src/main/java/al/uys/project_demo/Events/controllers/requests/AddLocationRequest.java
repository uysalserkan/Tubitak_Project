package al.uys.project_demo.Events.controllers.requests;

import al.uys.project_demo.Events.models.Location;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@ToString
@RequiredArgsConstructor
public class AddLocationRequest {
  @Size(min = 3, max = 25, message = "Latitude min. 3 max. 25 characters")
  @NotEmpty(message = "You cannot blank latitude")
  private final String latitude;

  @Size(min = 3, max = 25, message = "Longtitude min. 3 max. 25 characters")
  @NotEmpty(message = "You cannot blank longtitude")
  private final String longtitude;

  public Location toLocation() {
    return new Location(latitude, longtitude);
  }
}
