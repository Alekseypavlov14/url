# @oleksii-pavlov/url - URL utils

## Description

`@oleksii-pavlov/url` is a lightweight TypeScript utility library for manipulating URL search parameters, hash values, and pathnames in web applications.

## Installation

```bash
npm install @oleksii-pavlov/url
```

## Usage

### Basic Usage

```typescript
import { URLService } from '@oleksii-pavlov/url'

const urlService = new URLService(config);

urlService.setSearchParam('key', 'value');

const value = urlService.getSearchParam('key');

console.log(value); // Output: 'value'
```

### Methods

#### Search Parameter Methods

##### `setSearchParam(key: string, value: string): void`

Sets a search parameter with the specified key and value.

##### `setSearchParams(params: SearchParams): void`

Sets multiple search parameters using an object of key-value pairs.

##### `appendSearchParam(key: string, value: string): void`

Appends a search parameter with the specified key and value.

##### `appendSearchParams(params: SearchParams): void`

Appends multiple search parameters using an object of key-value pairs.

##### `getSearchParam(key: string): string | null`

Gets the value of the search parameter with the specified key.

##### `hasSearchParam(key: string): boolean`

Checks if a search parameter with the specified key exists.

##### `deleteSearchParam(key: string): void`

Deletes the search parameter with the specified key.

##### `getSearchParams(): SearchParams`

Gets all search parameters as an object of key-value pairs.

##### `deleteSearchParams(): void`

Deletes all search parameters.

##### `serializeSearchParams(params?: SearchParams): string`

Serializes search parameters into a query string. Optionally, you can provide custom search parameters. By default, it uses the window URL search params.

##### `deserializeSearchParams(paramString?: string): SearchParams`

Deserializes a query string into an object of search parameters. Optionally, you can provide a custom query string. By default, it uses the window URL search params.

#### Hash Methods

##### `setHash(hash: string): void`

Sets the hash value of the URL.

##### `getHash(): string`

Gets the hash value of the URL.

##### `clearHash(): void`

Clears the hash value of the URL.

#### Pathname Methods

##### `setPathname(pathname: string): void`

Sets the pathname of the URL.

##### `getPathname(): string`

Gets the pathname of the URL.

##### `resetPathname(): void`

Resets the pathname to `'/'`.

#### Utility Methods

##### `copyURL(): URL`

Creates a copy of the current URL.

##### `getBaseURL(): string`

Gets the base URL without search parameters or hash.

#### Subscription Methods

##### `onSearchParamsChange(callback: SubscriptionCallback<SearchParams>): UnsubscribeCallback`

Subscribes to changes in the search parameters. Returns a function to unsubscribe from the callback.

##### `onHashChange(callback: SubscriptionCallback<string>): UnsubscribeCallback`

Subscribes to changes in the hash value. Returns a function to unsubscribe from the callback.

##### `onPathnameChange(callback: SubscriptionCallback<string>): UnsubscribeCallback`

Subscribes to changes in the pathname. Returns a function to unsubscribe from the callback.

### Configuration

#### Config

The `Config` type defines the configuration options for `URLService`.

##### Properties

- `reload`: A boolean that specifies whether the page should reload when the URL is updated. Defaults to `false`.

### Example

```typescript
import { URLService } from '@oleksii-pavlov/url';

// Initialize URLService with configuration
const urlService = new URLService({ reload: true });

// Set a search parameter
urlService.setSearchParam('foo', 'bar');

// window reloaded
```
