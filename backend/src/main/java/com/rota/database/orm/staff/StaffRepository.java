package com.rota.database.orm.staff;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface StaffRepository extends CrudRepository<Staff, Long> {
  Staff findById(int id);

  List<Staff> findAll();
}
