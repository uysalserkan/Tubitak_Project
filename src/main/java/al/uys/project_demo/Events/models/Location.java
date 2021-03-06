package al.uys.project_demo.Events.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Embeddable;

@Embeddable
@AllArgsConstructor
@Getter
@ToString
public class Location {
  private String latitude;
  private String longitude;

  protected Location() {}
}
