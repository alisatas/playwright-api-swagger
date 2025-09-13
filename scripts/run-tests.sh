echo "API Test Runner"
echo "=========================="

# Function to run tests with specific environment
run_tests() {
    local env_name=$1
    local base_url=$2
    local additional_args=$3
    
    echo ""
    echo "🧪 Running tests for: $env_name"
    echo "📡 Base URL: $base_url"
    echo "⚙️  Additional args: $additional_args"
    echo "---"
    
    API_BASE_URL="$base_url" $additional_args npx playwright test --reporter=line
    
    if [ $? -eq 0 ]; then
        echo "✅ $env_name tests passed!"
    else
        echo "❌ $env_name tests failed!"
    fi
}

case "$1" in
    "dev")
        run_tests "Development" "https://jsonplaceholder.typicode.com" "REPORT_FORMAT=line"
        ;;
    "staging")
        run_tests "Staging" "https://petstore.swagger.io/v2" "API_RETRIES=3 API_TIMEOUT=45000"
        ;;
    "all")
        echo "🔄 Running all environment tests..."
        run_tests "Development" "https://jsonplaceholder.typicode.com" "REPORT_FORMAT=line"
        echo ""
        echo "⏳ Waiting 2 seconds before next environment..."
        sleep 2
        run_tests "Staging" "https://petstore.swagger.io/v2" "API_RETRIES=3 API_TIMEOUT=45000"
        ;;
    "help"|"--help"|"-h")
        echo ""
        echo "Usage: $0 [environment]"
        echo ""
        echo "Available environments:"
        echo "  dev      - JSONPlaceholder API (default)"
        echo "  staging  - Swagger Petstore API"
        echo "  all      - Run tests against both environments"
        echo "  help     - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 dev"
        echo "  $0 staging"
        echo "  $0 all"
        ;;
    *)
        echo "🎯 No environment specified, running default (dev)..."
        run_tests "Development (Default)" "https://jsonplaceholder.typicode.com" "REPORT_FORMAT=line"
        echo ""
        echo "💡 Tip: Use '$0 help' to see all available options"
        ;;
esac

echo ""
echo "🏁 Test execution completed!"
