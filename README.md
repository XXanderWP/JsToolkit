# @xxanderwp/jstoolkit

![npm version](https://img.shields.io/npm/v/@xxanderwp/jstoolkit)
![license](https://img.shields.io/npm/l/@xxanderwp/jstoolkit)
![build](https://github.com/xxanderwp/jstoolkit/workflows/CI/badge.svg)

A comprehensive Swiss Army knife of JavaScript/TypeScript utilities for everyday development. Clean, tested, and tree-shakeable.

## Installation

```bash
npm install @xxanderwp/jstoolkit
```

## Features

- 🎯 **Tree-shakeable** - Only import what you need
- 📦 **TypeScript** - Full TypeScript support with type definitions
- ✅ **Well-tested** - High test coverage with Jest
- 🚀 **Zero dependencies** (except md5 for hashing)
- 📚 **Comprehensive** - 120+ utility functions across 9 categories

## Quick Start

```typescript
import { formatNumber, randomString, chunk } from '@xxanderwp/jstoolkit';

// Format numbers with thousands separator
formatNumber(1000000); // "1 000 000"

// Generate random string
randomString(10); // "aB3dE7fG9h"

// Split array into chunks
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## Modules

### String Utilities

```typescript
import { string } from '@xxanderwp/jstoolkit';
// or import individual functions
import { randomString, capitalize, truncate } from '@xxanderwp/jstoolkit';

randomString(10);                    // Random alphanumeric string
capitalize('hello');                 // "Hello"
truncate('Long text...', 10);       // "Long te..."
toCamelCase('hello-world');         // "helloWorld"
toSnakeCase('helloWorld');          // "hello_world"
toKebabCase('helloWorld');          // "hello-world"
removeWhitespace('hello world');    // "helloworld"
countOccurrences('test test', 'test'); // 2
```

### Array Utilities

```typescript
import { array } from '@xxanderwp/jstoolkit';

randomElement([1, 2, 3]);           // Random element
shuffle([1, 2, 3, 4]);              // Shuffled array
chunk([1, 2, 3, 4, 5], 2);          // [[1, 2], [3, 4], [5]]
unique([1, 2, 2, 3]);               // [1, 2, 3]
intersection([1, 2], [2, 3]);       // [2]
difference([1, 2], [2, 3]);         // [1]
groupBy(arr, item => item.type);    // Group by property
flatten([[1, 2], [3, 4]]);          // [1, 2, 3, 4]
sortBy(arr, [{ key: 'age', order: 'ASC' }]); // Sort by multiple keys
```

### Math Utilities

```typescript
import { math } from '@xxanderwp/jstoolkit';

randomInt(1, 10);                   // Random integer
randomFloat(1.5, 5.5);              // Random float
round(3.14159, 2);                  // 3.14
lerp(0, 10, 0.5);                   // 5 (interpolation)
lerp2D(point1, point2, 0.5);        // Interpolate 2D points
clamp(15, 0, 10);                   // 10
mapRange(5, 0, 10, 0, 100);         // 50
percentage(25, 100);                // 25
average([1, 2, 3, 4, 5]);           // 3
```

### Time Utilities

```typescript
import { time } from '@xxanderwp/jstoolkit';

timestamp();                        // Current Unix timestamp (seconds)
timestampMs();                      // Current timestamp (milliseconds)
formatDateTime();                   // "07.02.2026 15:30"
formatDate();                       // "07.02.2026"
formatDuration(3665);               // "01:01:05"
formatTimestamp(1234567890);        // Smart date/time formatting
sleep(1000);                        // Promise-based delay
timeAgo(date);                      // "2 hours ago"
isToday(date);                      // Check if date is today
```

### Encoding Utilities

```typescript
import { encoding } from '@xxanderwp/jstoolkit';

toBase64('hello');                  // Base64 encode
fromBase64('aGVsbG8=');             // Base64 decode
hash('password');                   // MD5 hash
encodeUri('hello world');           // URL encode
decodeUri('hello%20world');         // URL decode
hexToBytes('48656c6c6f');           // Hex to bytes
bytesToHex(bytes);                  // Bytes to hex
```

### Validation Utilities

```typescript
import { validation } from '@xxanderwp/jstoolkit';

isEmoji('😀');                      // true
isEmail('test@example.com');        // true
isUrl('https://example.com');       // true
isImageUrl('pic.jpg');              // true
isNumeric('123');                   // true
isAlpha('abc');                     // true
isAlphanumeric('abc123');           // true
isEmpty(null);                      // true
isPlainObject({});                  // true
extractUrl('Visit example.com');    // { url, domain }
isIPv4('192.168.1.1');              // true
isHexColor('#fff');                 // true
```

### Format Utilities

```typescript
import { format } from '@xxanderwp/jstoolkit';

formatNumber(1000000);              // "1 000 000"
formatBytes(1536);                  // "1.5 KB"
formatCurrency(1234.56);            // "$1,234.56"
formatPhone('1234567890');          // "(123) 456-7890"
formatCardNumber('1234567890123456'); // "1234 5678 9012 3456"
maskString('1234567890');           // "******7890"
formatPercentage(50.5);             // "50.50%"
pluralize(2, 'item');               // "2 items"
abbreviateNumber(1500000);          // "1.5M"
titleCase('hello world');           // "Hello World"
```

### Random Utilities

```typescript
import { random } from '@xxanderwp/jstoolkit';

randomInt(1, 10);                   // Random integer
randomFloat(1.5, 5.5);              // Random float
randomBoolean();                    // Random true/false
randomSample([1, 2, 3], 2);         // Pick 2 random elements
randomColor();                      // "#a3c2f1"
randomUUID();                       // "550e8400-e29b-41d4-a716-446655440000"
randomWeighted([1, 2, 3], [10, 5, 1]); // Weighted random choice
randomDate(start, end);             // Random date in range
```

### Object Utilities

```typescript
import { object } from '@xxanderwp/jstoolkit';

deepClone(obj);                     // Deep clone object
deepMerge(target, source1, source2); // Deep merge objects
get(obj, 'user.address.city');      // Get nested property
set(obj, 'user.name', 'John');      // Set nested property
pick(obj, ['a', 'b']);              // Pick properties
omit(obj, ['c']);                   // Omit properties
flatten({ a: { b: 1 } });           // { 'a.b': 1 }
unflatten({ 'a.b': 1 });            // { a: { b: 1 } }
keys(obj);                          // Get all keys (including nested)
values(obj);                        // Get all values (including nested)
isEqual(obj1, obj2);                // Deep equality check
```

## Usage Patterns

### Namespace Import

```typescript
import { string, array, math, object } from '@xxanderwp/jstoolkit';

string.capitalize('hello');
array.unique([1, 2, 2, 3]);
math.round(3.14159, 2);
object.deepClone(obj);
```

### Named Import (Tree-shakeable)

```typescript
import { capitalize, unique, round } from '@xxanderwp/jstoolkit';

capitalize('hello');
unique([1, 2, 2, 3]);
round(3.14159, 2);
```

## TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { chunk, groupBy } from '@xxanderwp/jstoolkit';

const numbers: number[] = [1, 2, 3, 4, 5];
const chunks: number[][] = chunk(numbers, 2);

interface User {
  name: string;
  role: string;
}

const users: User[] = [/* ... */];
const grouped: Record<string, User[]> = groupBy(users, u => u.role);
```

## Browser Support

Works in all modern browsers and Node.js environments (Node 14+).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © xxanderwp

## Links

- [GitHub Repository](https://github.com/xxanderwp/jstoolkit)
- [NPM Package](https://www.npmjs.com/package/@xxanderwp/jstoolkit)
- [Issue Tracker](https://github.com/xxanderwp/jstoolkit/issues)