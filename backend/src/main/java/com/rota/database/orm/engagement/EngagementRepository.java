package com.rota.database.orm.engagement;

import java.util.List;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface EngagementRepository extends CrudRepository<Engagement, Long> {
  List<Engagement> findByStaffId(int staffId);

  List<Engagement> findAll();

  Optional<Engagement> findById(int id);
}
