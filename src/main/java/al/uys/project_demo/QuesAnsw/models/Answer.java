package al.uys.project_demo.QuesAnsw.models;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Answer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String answer;
  private Long userId;

  @ManyToOne private Question question;
}
