import { expect, test } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

test.describe('Dynamic API Tests - Method PATCH', () => {
    let apiHelper: ApiHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request);
    });

    test('Partially update post with dynamic data', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postId = testData.testScenarios.validPostIds[0];
        
        const { response, data } = await apiHelper.patchPost(postId);
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('title', data.title);
        expect(responseBody).toHaveProperty('id', postId);
        // Other fields should remain unchanged
        expect(responseBody).toHaveProperty('userId');
        expect(responseBody).toHaveProperty('body');
    });

    test('Patch post with custom field', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postId = testData.testScenarios.validPostIds[1];
        
        const customPatch = {
            body: 'Only the body field is updated'
        };
        
        const { response, data } = await apiHelper.patchPost(postId, customPatch);
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('body', 'Only the body field is updated');
        expect(responseBody).toHaveProperty('id', postId);
    });

    test('Patch multiple posts with different fields', async () => {
        const testData = ApiHelper.loadTestData('posts.json');
        const postIds = testData.testScenarios.validPostIds.slice(0, 3);
        
        const patchData = [
            { title: 'Patched Title 1' },
            { body: 'Patched Body 2' },
            { title: 'Patched Title 3', body: 'Patched Body 3' }
        ];

        for (let i = 0; i < postIds.length; i++) {
            const { response } = await apiHelper.patchPost(postIds[i], patchData[i]);
            
            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            
            if (patchData[i].title) {
                expect(responseBody.title).toContain(patchData[i].title);
            }
            if (patchData[i].body) {
                expect(responseBody).toHaveProperty('body', patchData[i].body);
            }
        }
    });
})
