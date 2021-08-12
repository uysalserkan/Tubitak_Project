package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.User.controllers.request.AddUserRequest;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

/*
 * Tüm istekler `http://localhost:8080` üzerinden gerçekleşmektedir.
 * 1. GET `/users` ile veri tabanında bulunan tüm kullanıcıları UserResponse modeli üzerinden Liste olarak döner.
 * 2. GET `users/tcno` ile T.C. numarası girilmiş olan bir kullanıcının bilgilerini UserResponse modeli üzerinden gösterilir.
 * 3. POST `/users` üzerinden bir kullanıcının AddUserRequest modeli üzerinden bilgileri alınıp veri tabanına kayıt edilmesini sağlar.
 * 4. POST `users/id` ile Event id'si girilmiş bir Event'e JSON olarak gelen AddUserRequest modelinde bulunan kullanıcıyı kayıt eder.
 */

@RestController
@CrossOrigin
@RequestMapping(value="/users", produces = "application/json;charset=utf-8")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("")
  @Transactional
  public MessageResponse registerUser(@RequestBody @Valid AddUserRequest user) {
    return userService.addUser(user);
  }

  @GetMapping("/{tcno}")
  public UserResponse getUser(@PathVariable("tcno") String tcNo) {
    return userService.getUserWithTCNo(tcNo);
  }

  @PostMapping("/{id}")
  @Transactional
  public MessageResponse registerAnEvent(
      @PathVariable("id") Long eventId, @RequestBody @Valid AddUserRequest addUserRequest) {
    return userService.registerUserToEvent(eventId, addUserRequest);
  }

  @GetMapping()
  @PreAuthorize("hasRole('ADMIN')")
  public List<UserResponse> getAllUsers() {
    return userService.getAllUsers();
  }
}
