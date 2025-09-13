import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe(' - Method GET', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Get posts with dynamic validation', async () => {
        const response = await apiHelper.getAllPosts();
        expect(response.status()).toBe(200);
        
        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts.length).toBeGreaterThan(0);
        
        if (posts.length > 0) {
            ApiHelper.validatePostStructure(posts[0]);
        }
    });

    test('Get specific posts by valid IDs', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const validIds = testData.testScenarios.validPostIds.slice(0, 3);

        for (const id of validIds) {
            const response = await apiHelper.getPost(id);
            expect(response.status()).toBe(200);
            
            const post = await response.json();
            expect(post).toHaveProperty('id', id);
            ApiHelper.validatePostStructure(post);
        }
    });

    test('Get posts with invalid IDs (404 scenarios)', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const invalidIds = testData.testScenarios.invalidPostIds;

        for (const id of invalidIds) {
            const response = await apiHelper.getPost(id);
            expect(response.status()).toBe(404);
        }
    });

    test('Get posts with query parameters', async () => {
        const response = await apiHelper.getAllPosts({ userId: '1' });
        expect(response.status()).toBe(200);
        
        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy();
        
        posts.forEach((post: any) => {
            expect(post).toHaveProperty('userId', 1);
        });
    });

    test('Get users with dynamic validation', async () => {
        const response = await apiHelper.getAllUsers();
        expect(response.status()).toBe(200);
        
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        
        if (users.length > 0) {
            ApiHelper.validateUserStructure(users[0]);
        }
    });
})
