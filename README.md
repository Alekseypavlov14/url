# @oleksii-pavlov/url - URL utils

## Description

`@oleksii-pavlov/url` is a lightweight TypeScript utility library for manipulating URL search parameters and hash values in web applications.

## Installation

```bash
npm install @oleksii-pavlov/url
```

## Usage

### Basic Usage

```typescript
import { URLService } from '@oleksii-pavlov/url';

// Initialize URLService
const urlService = new URLService();

// Set a search parameter
urlService.setSearchParam('key', 'value');

// Get a search parameter
const value = urlService.getSearchParam('key');

console.log(value); // Output: 'value'
```

### Methods

#### `setSearchParam(key: string, value: string): void`

Sets a search parameter with the specified key and value.

#### `setSearchParams(params: SearchParams): void`

Sets multiple search parameters using an object of key-value pairs.

#### `appendSearchParam(key: string, value: string): void`

Appends a search parameter with the specified key and value.

#### `appendSearchParams(params: SearchParams): void`

Appends multiple search parameters using an object of key-value pairs.

#### `getSearchParam(key: string): string | null`

Gets the value of the search parameter with the specified key.

#### `hasSearchParam(key: string): boolean`

Checks if a search parameter with the specified key exists.

#### `deleteSearchParam(key: string): void`

Deletes the search parameter with the specified key.

#### `getSearchParams(): SearchParams`

Gets all search parameters as an object of key-value pairs.

#### `deleteSearchParams(): void`

Deletes all search parameters.

#### `serializeSearchParams(params?: SearchParams): string`

Serializes search parameters into a query string. Optionally, you can provide custom search parameters. By default it uses window url search params

#### `deserializeSearchParams(paramString?: string): SearchParams`

Deserializes a query string into an object of search parameters. Optionally, you can provide a custom query string. By default it uses window url search params

#### `setHash(hash: string): void`

Sets the hash value of the URL.

#### `getHash(): string`

Gets the hash value of the URL.

#### `clearHash(): void`

Clears the hash value of the URL.

#### `copyURL(): URL`

Creates a copy of the current URL.

#### `getBaseURL(): string`

Gets the base URL without search parameters or hash.

#### `onSearchParamsChange(callback: SubscriptionCallback): UnsubscribeCallback`

Subscribes to changes in the search parameters. Returns a function to unsubscribe from the callback.

#### `onHashChange(callback: SubscriptionCallback): UnsubscribeCallback`

Subscribes to changes in the hash value. Returns a function to unsubscribe from the callback.

