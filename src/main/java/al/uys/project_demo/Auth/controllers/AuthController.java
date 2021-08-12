package al.uys.project_demo.Auth.controllers;

import al.uys.project_demo.Auth.controllers.request.LoginForm;
import al.uys.project_demo.Auth.controllers.request.SignUpForm;
import al.uys.project_demo.Auth.controllers.response.JwtResponse;
import al.uys.project_demo.Auth.enums.Roles;
import al.uys.project_demo.Auth.jwt_adapters.JwtProvider;
import al.uys.project_demo.Auth.models.Admin;
import al.uys.project_demo.Auth.models.Role;
import al.uys.project_demo.Auth.repositories.AdminRepository;
import al.uys.project_demo.Auth.repositories.RoleRepository;
import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.Commons.enums.MessageResponseType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;

@CrossOrigin
@RestController
@RequestMapping(value = "/auth", produces = "application/json;charset=utf-8")
public class AuthController {
  String ROLE_PREFIX = "ROLE_";

  private final AuthenticationManager authenticationManager;
  private final AdminRepository adminRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtProvider jwtProvider;

  public AuthController(
      AuthenticationManager authenticationManager,
      AdminRepository adminRepository,
      RoleRepository roleRepository,
      PasswordEncoder passwordEncoder,
      JwtProvider jwtProvider) {
    this.authenticationManager = authenticationManager;
    this.adminRepository = adminRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtProvider = jwtProvider;
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtProvider.generateJwtToken(authentication);

    //    System.out.println("IN AUTHCONTROLLER - JWT TOKEN IS: " + jwt);
    return ResponseEntity.ok(new JwtResponse(jwt));
  }

  @PostMapping("/signup")
  public MessageResponse signupUser(@Valid @RequestBody SignUpForm signupRequest) {
    if (adminRepository.existsAdminByUsername(signupRequest.getUsername())) {
      return new MessageResponse(
          "Username is already used by another user, please try to login",
          MessageResponseType.ERROR);
    }
    if (adminRepository.existsAdminByEmail(signupRequest.getEmail())) {
      return new MessageResponse(
          "Email is already used by another user, please try to login", MessageResponseType.ERROR);
    }

    // ! Creating admin

    Admin admin =
        new Admin(
            signupRequest.getUsername(),
            signupRequest.getEmail(),
            passwordEncoder.encode(signupRequest.getPassword()));

    HashSet<Role> roles = new HashSet<Role>();

    signupRequest
        .getRole()
        .forEach(
            role -> {
              switch (role) {
                case "ADMIN":
                  Role admin_role =
                      roleRepository
                          .findByRole(Roles.ROLE_ADMIN)
                          .orElseThrow(
                              () ->
                                  new RuntimeException(
                                      "Fail, Admin role couldn't found in the system"));
                  roles.add(admin_role);
                  break;
                default:
                  Role user_role =
                      roleRepository
                          .findByRole(Roles.ROLE_USER)
                          .orElseThrow(
                              () ->
                                  new RuntimeException(
                                      "Fail, User role couldn't found in the system"));
                  roles.add(user_role);
              }
            });
    admin.setRoles(roles);
    adminRepository.save(admin);

    String signup_role = signupRequest.getRole().stream().toList().get(0);

    return new MessageResponse(
        "%s %s is registered."
            .formatted(admin.getUsername(), signup_role.equals("ADMIN") ? "admin" : "user"),
        MessageResponseType.SUCCESS);
  }
}
