# Contributing to @xxanderwp/jstoolkit

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/jstoolkit.git
cd jstoolkit
```

3. Install dependencies:
```bash
npm install
```

4. Create a branch:
```bash
git checkout -b feature/my-new-feature
```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Building

```bash
npm run build
```

## Adding New Utilities

When adding new utility functions:

1. Choose the appropriate module (string, array, math, time, etc.)
2. Add your function with JSDoc comments
3. Export it from the module's `index.ts`
4. Add comprehensive tests in the corresponding `.test.ts` file
5. Update the main `src/index.ts` if it should be exported at top level
6. Update README.md with examples

### Example Structure

```typescript
/**
 * Brief description of what the function does
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 */
export function myFunction(param1: string, param2: number): boolean {
  // Implementation
  return true;
}
```

## Testing Guidelines

- Write tests for all new functions
- Aim for high code coverage (80%+)
- Test edge cases and error conditions
- Use descriptive test names

```typescript
describe('myFunction', () => {
  it('should handle normal case', () => {
    expect(myFunction('test', 5)).toBe(true);
  });

  it('should handle edge case', () => {
    expect(myFunction('', 0)).toBe(false);
  });
});
```

## Code Style

- Use TypeScript
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Follow the commit message convention:
   - `feat: add new feature`
   - `fix: fix bug`
   - `docs: update documentation`
   - `test: add tests`
   - `refactor: refactor code`

4. Create a pull request with a clear description

## Questions?

Feel free to open an issue if you have questions or need help!