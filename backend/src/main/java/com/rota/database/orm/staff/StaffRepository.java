package com.rota.database.orm.staff;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface StaffRepository extends CrudRepository<Staff, Long> {
  Optional<Staff> findById(int id);

  List<Staff> findAll();
}
