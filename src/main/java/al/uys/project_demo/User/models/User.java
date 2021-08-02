package al.uys.project_demo.User.models;

import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Table(name = "USERS")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String tcNo;

  private String firstName;

  private String lastName;

  @OneToMany(cascade = CascadeType.ALL)
  private Set<QRCode> qrCodeSet;

  protected User() {}

  public User(String tcNo, String firstName, String lastName) {
    this.tcNo = tcNo;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return getClass().getSimpleName()
        + "("
        + "id = "
        + id
        + ", "
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

  public void addQRCode(QRCode qrCode) {
    this.qrCodeSet.add(qrCode);
  }

  public void removeQRCode(QRCode qrCode) {
    this.qrCodeSet.remove(qrCode);
  }

  public void updateUser(User user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.tcNo = user.tcNo;
  }
}
