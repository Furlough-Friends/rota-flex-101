INSERT INTO STAFF(first_name, surname, start_date, contracted_hours, hourly_rate, role, job_title,
active)
VALUES
    ('Joe', 'Bloggs', '2018-08-03', 40, 1.23, 'USER', 'barista', true),
    ('Mary', 'McGee', '2017-08-12', 40, 999.99, 'MANAGER', 'supervisor', true),
    ('Json', 'Server', '2015-01-12', 40, 0.01, 'USER', 'floor', true),
    ('Arthur', 'Guinness', '2019-12-12', 40, 2.99, 'USER', 'chef', true);

INSERT INTO ENGAGEMENT(start, end, type, hours_worked, staff_id)
VALUES
    ('2018-08-03 00:00', '2018-08-03 01:00', 'SHIFT', 1, 1),
    ('2018-08-04 09:00', '2018-08-04 17:00', 'HOLIDAY', 10, 1),
    ('2017-08-03 10:00', '2017-08-03 20:00', 'SHIFT', 10, 2),
    ('2018-08-03 00:00', '2018-08-13 00:00', 'HOLIDAY', 80, 2),
    ('2018-08-03 00:00', '2018-08-03 01:00', 'SHIFT', 1, 3),
    ('2018-08-03 00:00', '2018-08-03 01:00', 'HOLIDAY', 1, 3),
    ('2018-08-05 12:00', '2018-08-05 17:00', 'SHIFT', 3, 4),
    ('2020-08-03 00:00', '2021-08-03 01:00', 'HOLIDAY', 1, 4);
