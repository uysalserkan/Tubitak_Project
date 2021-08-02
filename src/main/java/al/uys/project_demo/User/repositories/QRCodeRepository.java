package al.uys.project_demo.User.repositories;

import al.uys.project_demo.User.controllers.response.QRCodeResponse;
import al.uys.project_demo.User.models.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QRCodeRepository extends JpaRepository<QRCode, Long> {
  boolean existsByUserTcNoAndEventId(String tcno, Long id);

  boolean existsByUserTcNo(String tcno);

  QRCode getQRCodeByEventIdAndUserTcNo(Long eventId, String tcNo);

  List<QRCode> getAllByUserTcNoOrderByEventId(String tcNo);

  void deleteQRCodeByUserTcNoAndEventId(String tcNo, Long id);
}
