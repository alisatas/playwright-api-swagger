# 🚀 Dynamic API Testing Features

This document outlines the dynamic capabilities implemented in this Playwright API testing framework.

## 🎯 Overview

The project has been transformed from static, hardcoded tests to a fully dynamic, configurable testing framework that supports:

- **Environment-based configuration**
- **Data-driven testing**
- **Reusable API helpers**
- **Dynamic data generation**
- **Multi-environment support**

## 📋 Dynamic Components

### 1. Environment Configuration

#### `.env.example` - Environment Variables Template
```bash
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=30000
API_RETRIES=2
TEST_ENVIRONMENT=development
PARALLEL_WORKERS=4
HEADLESS_MODE=true
GENERATE_REPORT=true
REPORT_FORMAT=html
TRACE_ON_FAILURE=true
```

#### `playwright.config.ts` - Dynamic Configuration
- Loads environment variables using `dotenv`
- Configurable base URL, timeouts, retries
- Dynamic header injection for API keys and auth tokens
- Environment-specific reporter settings

### 2. Test Data Management

#### `test-data/posts.json` - Post Test Data
```json
{
  "validPost": { ... },
  "updatePost": { ... },
  "patchPost": { ... },
  "testScenarios": {
    "validPostIds": [1, 2, 3, 4, 5],
    "invalidPostIds": [999999, -1, 0],
    "userIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
```

#### `test-data/users.json` - User Test Data
- User validation data
- Test scenarios for different user IDs

### 3. API Helper Class

#### `utils/api-helper.ts` - Centralized API Operations
- **Dynamic Data Generation**: Random strings, timestamps, IDs
- **CRUD Operations**: Create, Read, Update, Delete with dynamic data
- **Data Validation**: Structure validation for posts and users
- **Error Handling**: Centralized error handling and retries
- **Test Data Loading**: JSON file loading utilities

Key Methods:
- `createPost(customData?)` - Create posts with dynamic or custom data
- `updatePost(id, updateData?)` - Update posts with dynamic data
- `patchPost(id, patchData?)` - Partial updates with dynamic data
- `validatePostStructure(post)` - Validate response structure
- `generateRandomData()` - Generate random test data

### 4. Environment Management

#### `config/test-environments.json` - Multi-Environment Support
```json
{
  "development": {
    "baseURL": "https://jsonplaceholder.typicode.com",
    "timeout": 30000,
    "retries": 2
  },
  "staging": { ... },
  "production": { ... },
  "petstore": { ... }
}
```

### 5. Dynamic Test Scripts

#### `package.json` - Enhanced Scripts
```json
{
  "scripts": {
    "test:dev": "API_BASE_URL=https://jsonplaceholder.typicode.com REPORT_FORMAT=line npx playwright test",
    "test:staging": "TEST_ENVIRONMENT=staging npx playwright test",
    "test:petstore": "API_BASE_URL=https://petstore.swagger.io/v2 npx playwright test"
  }
}
```

#### `scripts/run-tests.sh` - Advanced Test Runner
- Multi-environment test execution
- Dynamic parameter passing
- Help system with usage examples
- Sequential and parallel execution modes

## 🧪 Dynamic Test Examples

### Before (Static/Hardcoded)
```typescript
test('Create a post', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  });
  expect(response.status()).toBe(201);
});
```

### After (Dynamic)
```typescript
test('Create a post with dynamic data', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  const { response, data } = await apiHelper.createPost();
  
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  
  expect(responseBody).toHaveProperty('title', data.title);
  ApiHelper.validatePostStructure(responseBody);
});
```

## 🎛️ Usage Examples

### Environment Switching
```bash
# Development environment
npm run test:dev

# Staging environment  
npm run test:staging

# Custom API
API_BASE_URL=https://my-api.com npx playwright test

# With authentication
API_BASE_URL=https://my-api.com API_KEY=secret npx playwright test
```

### Dynamic Test Runner
```bash
# Single environment
./scripts/run-tests.sh dev

# Multiple environments
./scripts/run-tests.sh all

# Help and options
./scripts/run-tests.sh help
```

### Custom Data Testing
```typescript
// Test with custom data
const customData = {
  title: 'Custom Test Post',
  body: 'Custom content',
  userId: 2
};
const { response } = await apiHelper.createPost(customData);

// Test with multiple scenarios
const testData = ApiHelper.loadTestData('posts.json');
const userIds = testData.testScenarios.userIds.slice(0, 3);

for (const userId of userIds) {
  const { response } = await apiHelper.createPost({ userId });
  // ... assertions
}
```

## 🔧 Benefits of Dynamic Approach

1. **Maintainability**: Centralized configuration and data management
2. **Reusability**: API helper methods can be used across all tests
3. **Flexibility**: Easy switching between different APIs and environments
4. **Scalability**: Easy to add new test scenarios and data sets
5. **Reliability**: Built-in validations and error handling
6. **Debugging**: Better logging and trace capabilities
7. **CI/CD Ready**: Environment-specific configurations for different deployment stages

## 📊 Test Coverage

The dynamic framework now covers:
- ✅ **28 test cases** across all HTTP methods
- ✅ **Dynamic data generation** with timestamps and random values
- ✅ **Multi-environment support** (dev, staging, production, petstore)
- ✅ **Data-driven scenarios** using JSON test data
- ✅ **Structure validation** for API responses
- ✅ **Error handling** for invalid scenarios
- ✅ **Custom data injection** for specific test cases
- ✅ **Batch operations** for testing multiple scenarios

## 🚀 Future Enhancements

Potential areas for further dynamic improvements:
- Database integration for test data
- API response mocking capabilities
- Performance testing integration
- Visual regression testing
- Automated test data cleanup
- Advanced reporting with custom metrics
- Integration with external test management tools
