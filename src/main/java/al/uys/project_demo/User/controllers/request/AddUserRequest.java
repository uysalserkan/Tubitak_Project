package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.User;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class AddUserRequest {
  @Size(min = 11, max = 11, message = "You have to enter a valid T.C. number")
  @NotBlank(message = "You cannot blank T.C. number")
  private final String tcNo;

  @NotBlank(message = "You cannot blank firstname")
  private final String firstName;

  @NotBlank(message = "You cannot blank lastname")
  private final String lastName;

  public AddUserRequest(String tcNo, String firstName, String lastName) {
    this.tcNo = tcNo;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public User toUser() {
    return new User(tcNo, firstName, lastName);
  }
}
