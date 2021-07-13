package al.uys.project_demo;

import al.uys.project_demo.Events.enums.EventCategory;
import al.uys.project_demo.Events.models.Event;
import al.uys.project_demo.Events.models.Location;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

public class EventTests {

  @Test
  public void testCreationEvent() {
    Location myNewLocation = new Location("2508", "1998");
    LocalDate startDate = LocalDate.parse("1998-08-25");
    LocalDate endDate = LocalDate.parse("2025-08-25");
    Event myEvent =
        new Event(
            "Birth day party!", true, startDate, endDate, 250, myNewLocation, EventCategory.CODE);

    System.out.println(myEvent.toString());
  }
}
