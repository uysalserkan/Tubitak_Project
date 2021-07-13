package al.uys.project_demo.QuesAnsw.repositories;

import al.uys.project_demo.QuesAnsw.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {}
