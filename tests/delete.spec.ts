import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe(' - Method DELETE', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Delete post with dynamic ID', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postId = testData.testScenarios.validPostIds[0];
        
        const response = await apiHelper.deletePost(postId);
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toEqual({});
    });

    test('Delete multiple posts', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postIds = testData.testScenarios.validPostIds.slice(0, 3);

        for (const postId of postIds) {
            const response = await apiHelper.deletePost(postId);
            expect(response.status()).toBe(200);
            
            const responseBody = await response.json();
            expect(responseBody).toEqual({});
        }
    });

    test('Delete non-existent post', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const invalidId = testData.testScenarios.invalidPostIds[0];
        
        const response = await apiHelper.deletePost(invalidId);
        expect(response.status()).toBe(200);
    });
})
