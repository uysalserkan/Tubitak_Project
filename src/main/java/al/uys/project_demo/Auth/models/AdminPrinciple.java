package al.uys.project_demo.Auth.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class AdminPrinciple implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String email;

  @JsonIgnore private String password;

  private Collection authorities;

  public AdminPrinciple(
      Long id, String username, String email, String password, Collection authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static AdminPrinciple build(Admin admin) {
    List authorities =
        admin.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getRole().name()))
            .toList();

    return new AdminPrinciple(
        admin.getId(), admin.getUsername(), admin.getEmail(), admin.getPassword(), authorities);
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof AdminPrinciple that)) return false;
    return getId().equals(that.getId()) && getUsername().equals(that.getUsername()) && getEmail().equals(that.getEmail()) && getPassword().equals(that.getPassword()) && getAuthorities().equals(that.getAuthorities());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getUsername(), getEmail(), getPassword(), getAuthorities());
  }

  @Override
  public String toString() {
    return "AdminPrinciple{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", authorities=" + authorities +
            '}';
  }
}
