import { expect, test } from '@playwright/test';

test.describe(' - Method HEAD', () => {
    const endpoints = [
        { path: '/posts', name: 'posts' },
        { path: '/users', name: 'users' },
        { path: '/comments', name: 'comments' },
        { path: '/albums', name: 'albums' },
        { path: '/todos', name: 'todos' }
    ];

    endpoints.forEach(({ path, name }) => {
        test(`Check ${name} endpoint availability`, async ({ request }) => {
            const response = await request.head(path);
            expect(response.status()).toBe(200);
            
            // HEAD requests should not return a body
            const headers = response.headers();
            expect(headers['content-type']).toBeDefined();
            expect(headers['content-type']).toContain('application/json');
            
            // Check for common headers
            expect(headers).toHaveProperty('date');
            expect(headers).toHaveProperty('server');
        });
    });

    test('Check specific post endpoint availability', async ({ request }) => {
        const response = await request.head('/posts/1');
        expect(response.status()).toBe(200);
        
        const headers = response.headers();
        expect(headers['content-type']).toBeDefined();
    });

    test('Check non-existent endpoint (404)', async ({ request }) => {
        const response = await request.head('/nonexistent');
        expect(response.status()).toBe(404);
    });
})
