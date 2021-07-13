package al.uys.project_demo.User.controllers.request;

import al.uys.project_demo.User.models.User;

public class AddUserRequest {
  private final String tcNo;
  private final String firstName;
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
