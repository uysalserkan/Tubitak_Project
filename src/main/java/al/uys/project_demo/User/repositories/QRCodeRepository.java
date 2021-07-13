package al.uys.project_demo.User.repositories;

import al.uys.project_demo.User.models.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRCodeRepository extends JpaRepository<QRCode, Long> {
  boolean existsByUserTcNo(String tcno);
}
