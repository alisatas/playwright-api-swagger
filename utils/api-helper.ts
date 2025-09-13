import { APIRequestContext, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Load test data from JSON file
   */
  static loadTestData(filename: string): any {
    const filePath = path.join(process.cwd(), 'test-data', filename);
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  }

  /**
   * Generate random test data
   */
  static generateRandomData() {
    const timestamp = Date.now();
    return {
      id: Math.floor(Math.random() * 100000),
      timestamp,
      randomString: `test_${timestamp}_${Math.random().toString(36).substring(7)}`,
      randomNumber: Math.floor(Math.random() * 1000),
    };
  }

  /**
   * Create a post with dynamic data
   */
  async createPost(postData?: any) {
    const defaultData = ApiHelper.loadTestData('posts.json').validPost;
    const randomData = ApiHelper.generateRandomData();
    
    const data = {
      ...defaultData,
      ...postData,
      title: postData?.title ? `${postData.title} - ${randomData.randomString}` : `${defaultData.title} - ${randomData.randomString}`,
      body: postData?.body ? `${postData.body} - Generated at ${new Date().toISOString()}` : `${defaultData.body} - Generated at ${new Date().toISOString()}`,
    };

    const response = await this.request.post('/posts', {
      data,
      headers: { 'Content-Type': 'application/json' },
    });

    return { response, data };
  }

  /**
   * Get post by ID with error handling
   */
  async getPost(id: number) {
    const response = await this.request.get(`/posts/${id}`);
    return response;
  }

  /**
   * Update post with dynamic data
   */
  async updatePost(id: number, updateData?: any) {
    const defaultData = ApiHelper.loadTestData('posts.json').updatePost;
    const randomData = ApiHelper.generateRandomData();
    
    const data = {
      ...defaultData,
      ...updateData,
      id,
      title: updateData?.title ? `${updateData.title} - ${randomData.randomString}` : `${defaultData.title} - ${randomData.randomString}`,
      body: updateData?.body ? `${updateData.body} - Updated at ${new Date().toISOString()}` : `${defaultData.body} - Updated at ${new Date().toISOString()}`,
    };

    const response = await this.request.put(`/posts/${id}`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });

    return { response, data };
  }

  /**
   * Patch post with dynamic data
   */
  async patchPost(id: number, patchData?: any) {
    const defaultData = ApiHelper.loadTestData('posts.json').patchPost;
    const randomData = ApiHelper.generateRandomData();
    
    const data = {
      ...defaultData,
      ...patchData,
      title: patchData?.title ? `${patchData.title} - ${randomData.randomString}` : `${defaultData.title} - ${randomData.randomString}`,
    };

    const response = await this.request.patch(`/posts/${id}`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });

    return { response, data };
  }

  /**
   * Delete post
   */
  async deletePost(id: number) {
    const response = await this.request.delete(`/posts/${id}`);
    return response;
  }

  /**
   * Get all posts with optional query parameters
   */
  async getAllPosts(params?: Record<string, string>) {
    const response = await this.request.get('/posts', { params });
    return response;
  }

  /**
   * Get all users
   */
  async getAllUsers() {
    const response = await this.request.get('/users');
    return response;
  }

  /**
   * Validate response structure
   */
  static validatePostStructure(post: any) {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');
  }

  /**
   * Validate user structure
   */
  static validateUserStructure(user: any) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.username).toBe('string');
  }

  /**
   * Wait for a condition with timeout
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 5000,
    interval: number = 100
  ): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }
}
