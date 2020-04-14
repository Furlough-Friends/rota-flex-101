package com.rota.database.orm;

import java.util.Map;

public interface DbTableEntry {
  Map<DbColumn, Object> getPropertyMap();
}
