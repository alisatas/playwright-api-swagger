import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe(' - Method POST', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Create a new post with dynamic data', async () => {
        const { response, data } = await apiHelper.createPost();
        
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('title', data.title);
        expect(responseBody).toHaveProperty('body', data.body);
        expect(responseBody).toHaveProperty('userId', data.userId);
        expect(responseBody).toHaveProperty('id');
        
        // Validate structure
        ApiHelper.validatePostStructure(responseBody);
    });

    test('Create post with custom data', async () => {
        const customData = {
            title: 'Custom Test Post',
            body: 'This is a custom test post body',
            userId: 2
        };

        const { response, data } = await apiHelper.createPost(customData);
        
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        
        expect(responseBody.title).toContain('Custom Test Post');
        expect(responseBody.body).toContain('This is a custom test post body');
        expect(responseBody).toHaveProperty('userId', 2);
    });

    test('Create multiple posts with different user IDs', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const userIds = testData.testScenarios.userIds.slice(0, 3); // Test with first 3 users

        for (const userId of userIds) {
            const { response } = await apiHelper.createPost({ userId });
            expect(response.status()).toBe(201);
            
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('userId', userId);
        }
    });
})
