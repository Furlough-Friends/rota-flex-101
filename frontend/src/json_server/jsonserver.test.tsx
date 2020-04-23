import React from 'react';

test('Get staff from json server', async () => {
  const url = 'http://localhost:3030/staff';
  const data = await fetch(url).then((res) => res.json());
  expect(data.length).toBeDefined();
});

test('Get staff with id = 1', async () => {
  const url = 'http://localhost:3030/staff/1';
  const data = await fetch(url).then((res) => res.json());
  expect(data['first_name']).toBeDefined();
});

test('Post new staff member', async () => {
  const url = 'http://localhost:3030/staff';
  const data = await fetch(url).then((res) => res.json());
  const count = data.length;

  const newStaff = {
    first_name: 'Johnny',
    surname: 'Herbert',
    start_date: '2018-08-03',
    contracted_hours: 40,
    hourly_rate: 2,
    role: 'USER',
    job_title: 'barista',
    inactive: false,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStaff),
  });

  expect(response.status).toBe(201);
});
