package al.uys.project_demo.Auth.controllers.request;

import al.uys.project_demo.Auth.models.Role;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
public class SignUpForm {
  private Set<String> role;

  @NotBlank(message = "You cannot blank username field if you want to signup")
  @Size(min = 3, max = 255, message = "You can set your username min. 3 max. 255 characters")
  private String username;

  @NotBlank(message = "You cannot blank email field if you want to signup")
  @Email(message = "You have to insert a valid email address")
  private String email;

  @NotBlank(message = "You cannot blank password field if you want to signup")
  @Size(min = 6, max = 255, message = "You can set your password min. 6 max. 255 characters")
  private String password;
}
