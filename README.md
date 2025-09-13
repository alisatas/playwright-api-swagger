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

## Dynamic Testing Approach

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

### Error Handling
```typescript
// Test invalid scenarios
const invalidIds = testData.testScenarios.invalidPostIds;

for (const id of invalidIds) {
  const response = await apiHelper.getPost(id);
  expect(response.status()).toBe(404);
}
```
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