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
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/auth")
public class AuthController {

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
  public ResponseEntity authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtProvider.generateJwtToken(authentication);
    return ResponseEntity.ok(new JwtResponse(jwt));
  }

  @PostMapping("/signup")
  public ResponseEntity signupUser(@Valid @RequestBody SignUpForm signupRequest) {
    if (adminRepository.existsAdminByUsername(signupRequest.getUsername())) {
      return new ResponseEntity(
          "Username is already used by another user, please try to login", HttpStatus.BAD_REQUEST);
    }
    if (adminRepository.existsAdminByEmail(signupRequest.getEmail())) {
      return new ResponseEntity(
          "Email is already used by another user, please try to login", HttpStatus.BAD_REQUEST);
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
                          .findByRole(Roles.ADMIN)
                          .orElseThrow(
                              () ->
                                  new RuntimeException(
                                      "Fail, Admin role couldn't found in the system"));
                  roles.add(admin_role);
                  break;
                default:
                  Role user_role =
                      roleRepository
                          .findByRole(Roles.USER)
                          .orElseThrow(
                              () ->
                                  new RuntimeException(
                                      "Fail, User role couldn't found in the system"));
                  roles.add(user_role);
              }
            });
    admin.setRoles(roles);
    adminRepository.save(admin);

    return ResponseEntity.ok("%s admin is registered.".formatted(admin.getUsername()));
  }
}
