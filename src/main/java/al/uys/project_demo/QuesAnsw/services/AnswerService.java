package al.uys.project_demo.QuesAnsw.services;

import al.uys.project_demo.QuesAnsw.repositories.AnswerRepository;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
  private final AnswerRepository answerRepository;

  public AnswerService(AnswerRepository answerRepository) {
    this.answerRepository = answerRepository;
  }
}
