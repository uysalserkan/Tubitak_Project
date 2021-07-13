package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.User;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class AddUserRequest {
  @Size(min = 11, max = 11, message = "T.C. numarası 11 haneli olmak zorundadır.")
  @NotBlank(message = "User T.C. nuramasını boş bırakamazsınız..")
  private final String tcNo;

  @NotBlank(message = "Adınızı boş bırakamazsınız..")
  private final String firstName;

  @NotBlank(message = "soyadınızı boş bırakamazsınız..")
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

// TODO: Implemente Edilecek.
