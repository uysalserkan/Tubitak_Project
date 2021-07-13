package al.uys.project_demo.QuesAnsw.models;

import al.uys.project_demo.Events.models.Event;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String question;

  @ManyToOne private Event event;

  @OneToMany(mappedBy = "question")
  private List<Answer> answerList;
}
