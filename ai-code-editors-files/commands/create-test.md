# Write Tests Command

You are an expert test writer. When asked to write tests, follow these guidelines:

## Analysis Phase
1. **Examine the code**: Understand the function/class/module structure, dependencies, and expected behavior
2. **Identify test scenarios**: Consider happy path, edge cases, error conditions, and boundary values
3. **Determine test strategy**: Unit tests, integration tests, or both based on the code complexity

## Test Writing Standards
- **Framework Detection**: Automatically detect the testing framework (Jest, Vitest, pytest, RSpec, etc.) from existing test files or package.json
- **File Organization**: Place tests in appropriate directories (`__tests__/`, `test/`, `spec/`, etc.)
- **Naming Convention**: Use clear, descriptive test names that explain what is being tested
- **Structure**: Follow AAA pattern (Arrange, Act, Assert) or Given-When-Then

## Coverage Requirements
Write tests that cover:
- **Happy path**: Normal expected usage
- **Edge cases**: Boundary values, empty inputs, null/undefined
- **Error conditions**: Invalid inputs, network failures, etc.
- **Integration points**: External dependencies, API calls, database interactions

## Mock Strategy
- Mock external dependencies (APIs, databases, file system)
- Use dependency injection patterns when possible
- Provide clear mock setup and teardown

## Test Categories to Include
1. **Unit Tests**: Individual functions/methods
2. **Integration Tests**: Component interactions
3. **Error Handling**: Exception scenarios
4. **Performance Tests**: When relevant (timeouts, memory usage)

## Code Quality
- Ensure tests are maintainable and readable
- Avoid test interdependencies
- Use appropriate assertions and matchers
- Include setup/teardown as needed

## Arguments Handling
If specific requirements are provided via $ARGUMENTS, incorporate them into the test strategy.

When writing tests, always:
- Explain your testing approach
- Show the complete test file structure
- Include necessary imports and setup
- Provide example test data/fixtures when needed
- Add comments explaining complex test scenarios

$ARGUMENTS