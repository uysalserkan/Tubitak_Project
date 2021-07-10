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
  @Size(min = 3, max = 25, message = "En az 3, en fazla 25 karaketrli enlem bildirebilirsiniz.")
  @NotEmpty(message = "Enlem dizinini boş bırakamazısnız..")
  private final String latitude;

  @Size(min = 3, max = 25, message = "En az 3, en fazla 25 karaketrli boylam bildirebilirsiniz.")
  @NotEmpty(message = "Boylam dizinini boş bırakamazsınız.")
  private final String longtitude;

  public Location toLocation() {
    return new Location(latitude, longtitude);
  }
}
