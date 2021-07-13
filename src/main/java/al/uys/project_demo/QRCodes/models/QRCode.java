package al.uys.project_demo.QRCodes.models;

import al.uys.project_demo.Events.models.Event;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@RequiredArgsConstructor
@Entity
public class QRCode {
  @Id
  @Column(nullable = false, length = 11, unique = true)
  private String tcNo;

  private String firstName;

  private String lastName;

  // ? etk_id olarak diğer tabloda OneToOne
  @ManyToMany(mappedBy = "qrCodes")
  private Set<Event> event;

  @Override
  public String toString() {
    return getClass().getSimpleName()
        + "("
        + "tcNo = "
        + tcNo
        + ", "
        + "firstName = "
        + firstName
        + ", "
        + "lastName = "
        + lastName
        + ")";
  }
}
