CREATE TABLE STAFF (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  contracted_hours DECIMAL NOT NULL,
  hourly_rate DECIMAL NOT NULL,
  role ENUM('user', 'manager') NOT NULL,
  job_title VARCHAR(255) NOT NULL
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
    type ENUM('shift', 'holiday') NOT NULL,
    hours_worked DECIMAL,
    staff_id INT REFERENCES STAFF(id) ON DELETE CASCADE
);

INSERT INTO STAFF(first_name, surname, start_date, contracted_hours, hourly_rate, role, job_title)
VALUES
    ('Joe', 'Bloggs', '2018-08-03', 40, 1.23, 'user', 'barista'),
    ('Mary', 'McGee', '2017-08-12', 40, 999.99, 'manager', 'supervisor'),
    ('Json', 'Server', '2015-01-12', 40, 0.01, 'user', 'floor'),
    ('Arthur', 'Guinness', '2019-12-12', 40, 2.99, 'user', 'chef');
INSERT INTO PREFERRED_DATES(staff_id, monday, tuesday, wednesday, thursday, friday, saturday,
sunday)
VALUES
    (1, true, true, true, true, true, false, false),
    (2, false, false, false, false, false, true, true),
    (3, true, true, true, true, true, true, true),
    (4, false, false, false, false, false, false, false);
INSERT INTO ENGAGEMENT(start, end, type, hours_worked, staff_id)
VALUES
    ('2018-08-03 00:00', '2018-08-03 01:00', 'shift', 1, 1),
    ('2018-08-04 09:00', '2018-08-04 17:00', 'holiday', 10, 1),
    ('2017-08-03 10:00', '2017-08-03 20:00', 'shift', 10, 2),
    ('2018-08-03 00:00', '2018-08-13 00:00', 'holiday', 80, 2),
    ('2018-08-03 00:00', '2018-08-03 01:00', 'shift', 1, 3),
    ('2018-08-03 00:00', '2018-08-03 01:00', 'holiday', 1, 3),
    ('2018-08-05 12:00', '2018-08-05 17:00', 'shift', 3, 4),
    ('2020-08-03 00:00', '2021-08-03 01:00', 'holiday', 1, 4);
