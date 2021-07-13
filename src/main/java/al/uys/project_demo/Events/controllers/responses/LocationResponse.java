package al.uys.project_demo.Events.controllers.responses;

import al.uys.project_demo.Events.models.Location;
import lombok.Getter;

@Getter
public class LocationResponse {
  private final String latitude;
  private final String longtitude;

  public LocationResponse(Location location) {
    this.latitude = location.getLatitude();
    this.longtitude = location.getLongitude();
  }
}
