import {expect, test} from "@playwright/test"

test("should fetch a valid HTTP response", async ({request}) => {
    const jsonPlaceholderBaseUrl = 'https://jsonplaceholder.typicode.com';
    const firstUserUrl = `${jsonPlaceholderBaseUrl}/users/1`;

    const response = await request.get(firstUserUrl);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBe("Leanne Graham");
    expect(body).toHaveProperty("email");
    expect(body.email).toContain("@");
})

test("should return not found on non-existent user", async ({request}) => {
    const jsonPlaceholderBaseUrl = 'https://jsonplaceholder.typicode.com';
    const nonExistentUserUrl = `${jsonPlaceholderBaseUrl}/users/99999`;

    const response = await request.get(nonExistentUserUrl);

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    const body = await response.json();

    expect(body).toEqual({});
})

test("should successfully add a new user", async ({request}) => {
    const jsonPlaceholderBaseUrl = 'https://jsonplaceholder.typicode.com';
    const usersUrl = `${jsonPlaceholderBaseUrl}/users`;

    const payload = {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com"
    };

    const response = await request.post(usersUrl, {data: payload});

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.name).toBe(payload.name);
    expect(body.username).toBe(payload.username);
    expect(body.email).toBe(payload.email);
})

test("should successfully modify an existing user", async ({request}) => {
    const jsonPlaceholderBaseUrl = 'https://jsonplaceholder.typicode.com';
    const firstUserUrl = `${jsonPlaceholderBaseUrl}/users/1`;

    const payload = {
        name: "John Doe",
        email: "john@example.com"
    };

    const response = await request.patch(firstUserUrl, {data: payload});

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBe(payload.name);
    expect(body.email).toBe(payload.email);
})

test("should successfully delete an existing user", async ({request}) => {
    const jsonPlaceholderBaseUrl = 'https://jsonplaceholder.typicode.com';
    const firstUserUrl = `${jsonPlaceholderBaseUrl}/users/1`;

    const response = await request.delete(firstUserUrl);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toEqual({});
})