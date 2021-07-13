package al.uys.project_demo.User.controllers.response;

import al.uys.project_demo.User.models.User;

public class UserResponse {
  private String tcNo;
  private String firstName;
  private String lastName;

  public UserResponse(final User user) {
    this.tcNo = user.getTcNo();
    this.lastName = user.getLastName();
    this.firstName = user.getFirstName();
  }
}

// TODO: Implemente Edilecek.
