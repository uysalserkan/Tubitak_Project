package al.uys.project_demo.Auth.controllers.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
  private String token;
  private final String type = "Bearer";

  public JwtResponse(String token) {
    this.token = token;
  }
}
