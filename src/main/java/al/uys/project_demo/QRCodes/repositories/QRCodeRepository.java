package al.uys.project_demo.QRCodes.repositories;

import al.uys.project_demo.QRCodes.models.QRCodes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRCodeRepository extends JpaRepository<QRCodes, String> {
  QRCodes findByTcNo(String tcNo);

  QRCodes removeByTcNo(String tcNo);
}
