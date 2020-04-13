CREATE TABLE STAFF (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  start_date DATE,
  contracted_hours DECIMAL,
  hourly_rate DECIMAL,
  role ENUM('USER', 'MANAGER') NOT NULL,
  job_title VARCHAR(255)
);

CREATE TABLE PREFERRED_DATES (
    staff_id INT REFERENCES STAFF(id) ON DELETE CASCADE,
    PRIMARY KEY(staff_id),
    monday BOOLEAN,
    tuesday BOOLEAN,
    wednesday BOOLEAN,
    thursday BOOLEAN,
    friday BOOLEAN,
    saturday BOOLEAN,
    sunday BOOLEAN
);

CREATE TABLE ENGAGEMENT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    type ENUM('SHIFT', 'HOLIDAY') NOT NULL,
    hours_worked DECIMAL,
    staff_id INT REFERENCES STAFF(id) ON DELETE SET NULL
);

