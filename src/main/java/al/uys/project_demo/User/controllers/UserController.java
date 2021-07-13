package al.uys.project_demo.User.controllers;

import al.uys.project_demo.Commons.MessageResponse;
import al.uys.project_demo.User.controllers.request.AddUserRequest;
import al.uys.project_demo.User.controllers.response.UserResponse;
import al.uys.project_demo.User.services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/user_register")
  public MessageResponse registerUser(@RequestBody @Valid AddUserRequest user){
    return userService.addUser(user);
  }

  @GetMapping("/user/{tcno}")
  public UserResponse getUser(@PathVariable("tcno") String tcNo){
    return userService.getUserWithTCNo(tcNo);
  }

  @PostMapping("/{id}")
  public MessageResponse registerAnEvent(@PathVariable("id") Long eventId, @RequestBody @Valid AddUserRequest addUserRequest){
    return userService.registerUserToEvent(eventId, addUserRequest);
  }

  @GetMapping("/users")
  public List<UserResponse> getAllUsers(){
    return userService.getAllUsers();
  }
}
