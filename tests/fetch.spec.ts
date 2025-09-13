import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe('Dynamic API Tests - Method FETCH', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Fetch posts using fetch method with validation', async ({ request }) => {
        const response = await request.fetch('/posts');
        expect(response.status()).toBe(200);
        
        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts.length).toBeGreaterThan(0);
        
        // Validate structure of multiple posts
        const samplePosts = posts.slice(0, 3);
        samplePosts.forEach((post: any) => {
            ApiHelper.validatePostStructure(post);
        });
    });

    test('Fetch users data with dynamic validation', async ({ request }) => {
        const response = await request.fetch('/users');
        expect(response.status()).toBe(200);
        
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        
        // Validate structure of multiple users
        const sampleUsers = users.slice(0, 3);
        sampleUsers.forEach((user: any) => {
            ApiHelper.validateUserStructure(user);
        });
    });

    test('Fetch comments with dynamic validation', async ({ request }) => {
        const response = await request.fetch('/comments');
        expect(response.status()).toBe(200);
        
        const comments = await response.json();
        expect(Array.isArray(comments)).toBeTruthy();
        expect(comments.length).toBeGreaterThan(0);
        
        // Validate comment structure
        if (comments.length > 0) {
            const comment = comments[0];
            expect(comment).toHaveProperty('id');
            expect(comment).toHaveProperty('postId');
            expect(comment).toHaveProperty('name');
            expect(comment).toHaveProperty('email');
            expect(comment).toHaveProperty('body');
        }
    });

    test('Fetch albums with dynamic validation', async ({ request }) => {
        const response = await request.fetch('/albums');
        expect(response.status()).toBe(200);
        
        const albums = await response.json();
        expect(Array.isArray(albums)).toBeTruthy();
        expect(albums.length).toBeGreaterThan(0);
        
        // Validate album structure
        if (albums.length > 0) {
            const album = albums[0];
            expect(album).toHaveProperty('id');
            expect(album).toHaveProperty('userId');
            expect(album).toHaveProperty('title');
        }
    });
})
