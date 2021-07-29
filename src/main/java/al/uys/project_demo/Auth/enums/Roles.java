package al.uys.project_demo.Auth.enums;

public enum Roles {
  ADMIN("ADMIN"),
  USER("USER");

  private final String role;

  Roles(String role) {
    this.role = role;
  }

  public String getRole() {
    return role;
  }

  @Override
  public String toString() {
    return "Roles{" + "role='" + role + '\'' + '}';
  }
}
