package al.uys.project_demo.Events.repositories;

import al.uys.project_demo.Events.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

  Optional<List<Event>> findAllByEventStatus(Boolean status);

  Optional<List<Event>> findByEventNameContains(String eventName);
}
