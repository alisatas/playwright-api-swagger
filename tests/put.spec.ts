import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe('Dynamic API Tests - Method PUT', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Update post with dynamic data', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postId = testData.testScenarios.validPostIds[0];
        
        const { response, data } = await apiHelper.updatePost(postId);
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('title', data.title);
        expect(responseBody).toHaveProperty('body', data.body);
        expect(responseBody).toHaveProperty('userId', data.userId);
        expect(responseBody).toHaveProperty('id', postId);
        
        ApiHelper.validatePostStructure(responseBody);
    });

    test('Update post with custom data', async () => {
        const customData = {
            title: 'Custom Updated Title',
            body: 'Custom updated body content',
            userId: 3
        };

        const testData = ApiHelper.loadTestData('posts.json');
        const postId = testData.testScenarios.validPostIds[1];
        
        const { response, data } = await apiHelper.updatePost(postId, customData);
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody.title).toContain('Custom Updated Title');
        expect(responseBody.body).toContain('Custom updated body content');
        expect(responseBody).toHaveProperty('userId', 3);
        expect(responseBody).toHaveProperty('id', postId);
    });

    test('Update multiple posts with different data', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postIds = testData.testScenarios.validPostIds.slice(0, 2);
        const userIds = testData.testScenarios.userIds.slice(0, 2);

        for (let i = 0; i < postIds.length; i++) {
            const { response } = await apiHelper.updatePost(postIds[i], {
                userId: userIds[i],
                title: `Batch Update ${i + 1}`,
                body: `Batch updated content ${i + 1}`
            });
            
            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('userId', userIds[i]);
            expect(responseBody.title).toContain(`Batch Update ${i + 1}`);
        }
    });
})
