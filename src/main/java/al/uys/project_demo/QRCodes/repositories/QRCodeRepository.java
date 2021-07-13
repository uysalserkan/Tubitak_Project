package al.uys.project_demo.QRCodes.repositories;

import al.uys.project_demo.QRCodes.models.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRCodeRepository extends JpaRepository<QRCode, String> {
  QRCode findByTcNo(String tcNo);

  QRCode removeByTcNo(String tcNo);
}
