package com.rota.database.orm.staff;

import org.springframework.data.repository.CrudRepository;

public interface StaffRepository extends CrudRepository<Staff, Long> {
  Staff findById(int id);
}
