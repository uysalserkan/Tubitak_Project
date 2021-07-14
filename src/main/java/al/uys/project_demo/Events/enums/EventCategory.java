package al.uys.project_demo.Events.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum EventCategory {
  CODE("CODE"),
  GAME("GAME"),
  MUSIC("MUSIC"),
  RACE("RACE"),
  EDUCATION("EDUCATION"),
  BUSINESS("BUSINESS"),
  OTHERS("");

  private final String category;

  private EventCategory(final String category) {
    this.category = category;
  }

  public String getCategory() {
    return category;
  }

  @Override
  public String toString() {
    return this.category;
  }
}
