package al.uys.project_demo.User.controllers.response;

import al.uys.project_demo.User.models.User;
import lombok.Getter;

@Getter
public class UserResponse {
  private final String tcNo;
  private final String firstName;
  private final String lastName;

  public UserResponse(final User user) {
    this.tcNo = user.getTcNo();
    this.lastName = user.getLastName();
    this.firstName = user.getFirstName();
  }
}
