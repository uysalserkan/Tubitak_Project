package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.User.controllers.request.AddUserRequest;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.services.UserService;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("")
  public MessageResponse registerUser(@RequestBody @Valid AddUserRequest user) {
    return userService.addUser(user);
  }

  @GetMapping("/{tcno}")
  public UserResponse getUser(@PathVariable("tcno") String tcNo) {
    return userService.getUserWithTCNo(tcNo);
  }

  @PostMapping("/{id}")
  public MessageResponse registerAnEvent(
      @PathVariable("id") Long eventId, @RequestBody @Valid AddUserRequest addUserRequest) {
    return userService.registerUserToEvent(eventId, addUserRequest);
  }

  @GetMapping()
  public List<UserResponse> getAllUsers() {
    return userService.getAllUsers();
  }
}
