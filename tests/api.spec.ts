import { test, expect } from '@playwright/test';

test('Get API request ', async ({ request }) => {
  const getResponse = await request.get(
    'https://bff.playrealbrokerage.com/api/v1/maintenance/future',
  );
  expect(getResponse.status()).toBe(200);
  expect(getResponse.ok()).toBeTruthy();
  const text = await getResponse.text();
  console.log(text);
  expect(text).toContain('futureMaintenance');
  console.log(await getResponse.json());
});

test('Delete API request ', async ({ request }) => {
  const getResponse = await request.delete('https://reqres.in/api/users/2');
  expect(getResponse.status()).toBe(204);
});

test('Post API request', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'morpheus',
      job: 'leader',
    },
  });
  expect(response.status()).toBe(201);
  const text = await response.text();
  expect(text).toContain('morpheus');
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
});

test('Put API request', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    data: {
      name: 'morpheus',
      job: 'leader',
    },
  });
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain('4');
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
});
