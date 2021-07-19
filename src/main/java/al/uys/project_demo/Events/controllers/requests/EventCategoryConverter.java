package al.uys.project_demo.Events.controllers.requests;

import al.uys.project_demo.Events.enums.EventCategory;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EventCategoryConverter {
  private final String category;

  public EventCategoryConverter(String category) {
    this.category = category;
  }

  public EventCategory toEventCategory() {
    return switch (this.category) {
      case "CODE" -> EventCategory.CODE;
      case "GAME" -> EventCategory.GAME;
      case "MUSIC" -> EventCategory.MUSIC;
      case "RACE" -> EventCategory.RACE;
      case "EDUCATION" -> EventCategory.EDUCATION;
      case "BUSINESS" -> EventCategory.BUSINESS;
      default -> EventCategory.OTHERS;
    };
  }
}
