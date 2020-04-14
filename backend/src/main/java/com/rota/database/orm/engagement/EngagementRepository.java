package com.rota.database.orm.engagement;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface EngagementRepository extends CrudRepository<Engagement, Long> {
  List<Engagement> findByStaffId(int staffId);

  Engagement findById(int id);
}
