package al.uys.project_demo.User.repositories;

import al.uys.project_demo.User.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
  User findByTcNo(String tcNo);

  User removeByTcNo(String tcNo);
}
