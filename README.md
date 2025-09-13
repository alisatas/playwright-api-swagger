# 🎭 Dynamic API Testing with Playwright

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Playwright](https://img.shields.io/badge/Playwright-1.54.1-green.svg?style=for-the-badge&logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=for-the-badge&logo=node.js)

A **dynamic**, **data-driven** API testing framework built with Playwright that supports multiple environments, configurable test data, and reusable API helpers.

## ✨ Key Features

- 🌍 **Multi-Environment Support** - Test against different APIs (dev, staging, production)
- 📊 **Data-Driven Testing** - JSON-based test data with dynamic generation
- 🔧 **Environment Configuration** - Flexible configuration via environment variables
- 🛠️ **Reusable API Helpers** - Centralized API operations with built-in validations
- 🚀 **Dynamic Test Execution** - Custom test runner with multiple execution modes
- 📈 **Comprehensive Reporting** - HTML reports with traces and screenshots
- 🔐 **Authentication Support** - API keys and token-based authentication
- ⚡ **Parallel Execution** - Configurable worker processes for faster testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/api-playwright-tests.git
cd api-playwright-tests
npm install
```

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
```bash
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=30000
API_RETRIES=2
TEST_ENVIRONMENT=development
PARALLEL_WORKERS=4
REPORT_FORMAT=html
TRACE_ON_FAILURE=true
```

### Run Your First Tests

```bash
# Run all tests with default configuration
npm test

# Run tests in development mode with line reporter
npm run test:dev

# Run tests with UI mode for debugging
npm run test:ui

# Generate and view test report
npm run test:report
```

## 📁 Project Architecture

```
api-playwright-tests/
├── 📂 config/
│   └── test-environments.json     # Environment-specific configurations
├── 📂 scripts/
│   └── run-tests.sh              # Advanced test runner script
├── 📂 test-data/
│   ├── posts.json                # Post-related test data and scenarios
│   └── users.json                # User-related test data and scenarios
├── 📂 tests/
│   ├── delete.spec.ts            # DELETE method tests
│   ├── fetch.spec.ts             # FETCH method tests
│   ├── get.spec.ts               # GET method tests
│   ├── head.spec.ts              # HEAD method tests
│   ├── patch.spec.ts             # PATCH method tests
│   ├── post.spec.ts              # POST method tests
│   └── put.spec.ts               # PUT method tests
├── 📂 utils/
│   └── api-helper.ts             # Reusable API helper class
├── .env.example                  # Environment variables template
├── playwright.config.ts          # Dynamic Playwright configuration
└── package.json                  # Dependencies and scripts
```

## 🎯 Dynamic Testing Approach

### Environment-Based Configuration

Switch between different APIs and environments effortlessly:

```bash
# Test against JSONPlaceholder (default)
npm run test:dev

# Test against Swagger Petstore API (staging)
npm run test:staging

# Test against custom API
API_BASE_URL=https://your-api.com npm test
```

### Data-Driven Test Scenarios

Tests use JSON files for test data, making them easily maintainable:

```json
// test-data/posts.json
{
  "validPost": {
    "title": "Dynamic Test Post",
    "body": "This is a dynamically generated test post content",
    "userId": 1
  },
  "testScenarios": {
    "validPostIds": [1, 2, 3, 4, 5],
    "invalidPostIds": [999999, -1, 0],
    "userIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
```

### Reusable API Helper

Centralized API operations with built-in validations:

```typescript
// Example test using API helper
test('Create post with dynamic data', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  const { response, data } = await apiHelper.createPost();
  
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  
  // Built-in structure validation
  ApiHelper.validatePostStructure(responseBody);
});
```

## 🛠️ Advanced Usage

### Custom Test Runner

Use the advanced test runner for complex scenarios:

```bash
# Make script executable (first time only)
chmod +x scripts/run-tests.sh

# Run specific environment
./scripts/run-tests.sh dev
./scripts/run-tests.sh staging

# Run all environments sequentially
./scripts/run-tests.sh all

# See all available options
./scripts/run-tests.sh help
```

### Authentication & Headers

Configure API authentication through environment variables:

```bash
# API Key authentication
API_KEY=your-secret-key npm test

# Bearer token authentication
AUTH_TOKEN=your-jwt-token npm test

# Custom API with authentication
API_BASE_URL=https://secure-api.com API_KEY=secret npm test
```

### Custom Test Data

Override default test data for specific scenarios:

```typescript
// Create post with custom data
const customData = {
  title: 'Custom Test Title',
  body: 'Custom test content',
  userId: 5
};
const { response } = await apiHelper.createPost(customData);
```

## 📊 Test Coverage

Our dynamic framework covers comprehensive API testing scenarios:

| HTTP Method | Test Cases | Features |
|-------------|------------|----------|
| **GET** | 5 tests | Single/multiple resources, query parameters, 404 handling |
| **POST** | 3 tests | Dynamic data creation, custom data, batch operations |
| **PUT** | 3 tests | Full resource updates, custom data, batch updates |
| **PATCH** | 3 tests | Partial updates, field-specific updates, batch operations |
| **DELETE** | 3 tests | Resource deletion, batch deletion, non-existent resources |
| **FETCH** | 4 tests | Alternative GET method, multiple endpoints |
| **HEAD** | 7 tests | Endpoint availability, header validation |

**Total: 28 dynamic test cases**

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_BASE_URL` | Base URL for API testing | `https://jsonplaceholder.typicode.com` |
| `API_TIMEOUT` | Request timeout in milliseconds | `30000` |
| `API_RETRIES` | Number of retries for failed tests | `2` |
| `PARALLEL_WORKERS` | Number of parallel test workers | `4` |
| `REPORT_FORMAT` | Test report format (`html` or `line`) | `html` |
| `TRACE_ON_FAILURE` | Enable trace collection on failures | `true` |
| `API_KEY` | API key for authentication | - |
| `AUTH_TOKEN` | Bearer token for authentication | - |

### NPM Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests with default configuration |
| `npm run test:dev` | Development environment with line reporter |
| `npm run test:ui` | Interactive UI mode for debugging |
| `npm run test:debug` | Debug mode with step-by-step execution |
| `npm run test:headed` | Run tests in headed browser mode |
| `npm run test:report` | Generate and open HTML report |
| `npm run test:staging` | Run tests against staging environment (Petstore API) |

## 📈 Reporting & Debugging

### HTML Reports

Playwright generates comprehensive HTML reports with:
- ✅ Test execution results and timing
- 📸 Screenshots on failures
- 🔍 Network traces and logs
- 📊 Interactive test exploration
- 🎯 Detailed error information

### Trace Viewer

Enable trace collection for detailed debugging:
```bash
TRACE_ON_FAILURE=true npm test
```

View traces in the interactive trace viewer:
```bash
npx playwright show-trace test-results/trace.zip
```

## 🧪 Example Test Scenarios

### Basic CRUD Operations
```typescript
// Create a resource
const { response } = await apiHelper.createPost({
  title: 'New Post',
  body: 'Post content'
});

// Read the resource
const getResponse = await apiHelper.getPost(1);

// Update the resource
const { response: updateResponse } = await apiHelper.updatePost(1, {
  title: 'Updated Title'
});

// Delete the resource
const deleteResponse = await apiHelper.deletePost(1);
```

### Batch Operations
```typescript
// Test multiple user scenarios
const testData = ApiHelper.loadTestData('posts.json');
const userIds = testData.testScenarios.userIds.slice(0, 3);

for (const userId of userIds) {
  const { response } = await apiHelper.createPost({ userId });
  expect(response.status()).toBe(201);
}
```

### Error Handling
```typescript
// Test invalid scenarios
const invalidIds = testData.testScenarios.invalidPostIds;

for (const id of invalidIds) {
  const response = await apiHelper.getPost(id);
  expect(response.status()).toBe(404);
}
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install chromium
      
      - name: Run API tests - Development
        run: npm run test:dev
        env:
          API_BASE_URL: ${{ secrets.API_BASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
      
      - name: Run API tests - Staging
        run: npm run test:staging
        env:
          API_BASE_URL: ${{ secrets.STAGING_API_BASE_URL }}
          API_KEY: ${{ secrets.STAGING_API_KEY }}
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 Best Practices

### Test Organization
- ✅ Use descriptive test names that explain the scenario
- ✅ Group related tests using `test.describe()`
- ✅ Use the API helper for consistent operations
- ✅ Validate response structure using built-in validators

### Data Management
- ✅ Store test data in JSON files for easy maintenance
- ✅ Use dynamic data generation for unique test scenarios
- ✅ Separate valid and invalid test scenarios
- ✅ Use environment-specific test data when needed

### Environment Management
- ✅ Use environment variables for configuration
- ✅ Never commit sensitive data (API keys, tokens)
- ✅ Test against multiple environments
- ✅ Use the custom test runner for complex scenarios

## 🔍 Troubleshooting

### Common Issues

**Tests failing with 404 errors:**
- Check if the `API_BASE_URL` is correct
- Verify the API endpoints are available
- Ensure the API is not blocking requests

**Authentication errors:**
- Verify `API_KEY` or `AUTH_TOKEN` environment variables
- Check if the API requires specific header formats
- Ensure tokens are not expired

**Timeout errors:**
- Increase `API_TIMEOUT` value
- Check network connectivity
- Verify API response times

### Debug Mode

Run tests in debug mode for step-by-step execution:
```bash
npm run test:debug
```

Enable verbose logging:
```bash
DEBUG=pw:api npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API for testing
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

---
