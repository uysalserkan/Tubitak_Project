package al.uys.project_demo.Auth.controllers.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class LoginForm {
  @NotBlank(message = "If you want to login, you cannot blank your username")
  private final String username;

  @NotBlank(message = "If you want to login, you cannot blank your password")
  private final String password;
}
