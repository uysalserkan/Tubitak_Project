package al.uys.project_demo.QuesAnsw.services;

import al.uys.project_demo.QuesAnsw.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
  private final QuestionRepository questionRepository;

  public QuestionService(QuestionRepository questionRepository) {
    this.questionRepository = questionRepository;
  }
}
