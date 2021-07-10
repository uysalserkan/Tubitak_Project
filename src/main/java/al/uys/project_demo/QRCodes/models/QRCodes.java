package al.uys.project_demo.QRCodes.models;

import al.uys.project_demo.Events.models.Event;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class QRCodes {
  @Id
  @Column(nullable = false, length = 11, unique = true)
  private String tcNo;

  private String firstName;

  private String lastName;

  @Override
  public String toString() {
    return "QRCodes{"
        + "tc_no='"
        + tcNo
        + '\''
        + ", firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", event="
        + event
        + '}';
  }

  // ? etk_id olarak diğer tabloda OneToOne
  @ManyToMany private Set<Event> event = new HashSet<>();

  public QRCodes() {}
}
