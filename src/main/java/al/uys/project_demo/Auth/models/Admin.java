package al.uys.project_demo.Auth.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(
    name = "ADMIN",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = {"username"}),
      @UniqueConstraint(columnNames = {"email"})
    })
public class Admin {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "You cannot blank your username")
  @Size(min = 2, max = 255, message = "You can create a user name min. 2 max. 255 characters")
  private String username;

  @NotBlank(message = "You cannot blank your email address")
  @Email(message = "You have to enter a valid email address")
  private String email;

  @NotBlank(message = "You cannot blank your password")
  @Size(min = 6, max = 255, message = "You have to set a password with min. 6 max. 255 characters")
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "ADMIN_ROLES",
      joinColumns = @JoinColumn(name = "ADMIN_ID"),
      inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
  private Set<Role> roles = new HashSet<>();

  public Admin(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public void updateAdmin(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
