import { SubscriptionCallback } from './types/subscription-callback'
import { UnsubscribeCallback } from './types/unsubscribe-callback'
import { normalizeConfig } from './utils/normalize-config'
import { SearchParams } from './types/search-params'
import { Config } from './types/config'

export class URLService {
  private url: URL;
  private config: Required<Config>
  private pathnameChangeSubscribers: Set<SubscriptionCallback<string>>;
  private searchParamsChangeSubscribers: Set<SubscriptionCallback<SearchParams>>;
  private hashChangeSubscribers: Set<SubscriptionCallback<string>>;

  constructor(config: Config) {
    this.url = new URL(window.location.href);
    this.config = normalizeConfig(config)

    this.pathnameChangeSubscribers = new Set();
    this.searchParamsChangeSubscribers = new Set();
    this.hashChangeSubscribers = new Set();
  }

  public setSearchParam(key: string, value: string): void {
    this.url.searchParams.set(key, value);

    this.updateURL();
    this.notifySearchParamsChange();
  }
  public setSearchParams(params: SearchParams): void {
    Object.entries(params).forEach(([key, value]) => {
      this.url.searchParams.set(key, value);
    });

    this.updateURL();
    this.notifySearchParamsChange();
  }
  public appendSearchParam(key: string, value: string): void {
    this.url.searchParams.set(key, value);

    this.updateURL();
    this.notifySearchParamsChange();
  }
  public appendSearchParams(params: SearchParams): void {
    Object.entries(params).forEach(([key, value]) => {
      this.url.searchParams.append(key, value);
    });

    this.updateURL();
    this.notifySearchParamsChange();
  }
  public getSearchParam(key: string): string | null {
    return this.url.searchParams.get(key);
  }
  public hasSearchParam(key: string): boolean {
    return this.url.searchParams.has(key);
  }
  public deleteSearchParam(key: string): void {
    this.url.searchParams.delete(key);

    this.updateURL();
    this.notifySearchParamsChange();
  }
  public getSearchParams(): SearchParams {
    const params: SearchParams = {};

    this.url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }
  public deleteSearchParams(): void {
    this.url.search = ''

    this.updateURL()
    this.notifySearchParamsChange()
  }

  public serializeSearchParams(params: SearchParams = this.getSearchParams()): string {
    return new URLSearchParams(params).toString();
  }
  public deserializeSearchParams(paramString: string = this.serializeSearchParams()): SearchParams {
    const params = new URLSearchParams(paramString);
    const result: SearchParams = {};

    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }

  public setHash(hash: string): void {
    this.url.hash = hash;

    this.updateURL();
    this.notifyHashChange();
  }
  public getHash(): string {
    return this.url.hash;
  }
  public clearHash(): void {
    this.url.hash = '';
    
    this.updateURL();
    this.notifyHashChange();
  }

  public setPathname(pathname: string): void {
    this.url.pathname = pathname;

    this.updateURL();
    this.notifyPathnameChange();
  }
  public getPathname(): string {
    return this.url.pathname;
  }
  public resetPathname(): void {
    this.url.pathname = '/';

    this.updateURL();
    this.notifyPathnameChange();
  }

  public copyURL(): URL {
    return new URL(this.url.href);
  }
  public getBaseURL(): string {
    return `${this.url.origin}${this.url.pathname}`;
  }

  public onSearchParamsChange(callback: SubscriptionCallback<SearchParams>): UnsubscribeCallback {
    this.searchParamsChangeSubscribers.add(callback);
    return () => this.searchParamsChangeSubscribers.delete(callback);
  }
  public onHashChange(callback: SubscriptionCallback<string>): UnsubscribeCallback {
    this.hashChangeSubscribers.add(callback);
    return () => this.hashChangeSubscribers.delete(callback);
  }
  public onPathnameChange(callback: SubscriptionCallback<string>): UnsubscribeCallback {
    this.pathnameChangeSubscribers.add(callback);
    return () => this.pathnameChangeSubscribers.delete(callback);
  }

  private notifySearchParamsChange(): void {
    const newSearchParams = this.getSearchParams()
    this.searchParamsChangeSubscribers.forEach(callback => callback(newSearchParams));
  }
  private notifyHashChange(): void {
    const newHash = this.getHash()
    this.hashChangeSubscribers.forEach(callback => callback(newHash));
  }
  private notifyPathnameChange(): void {
    const newPathname = this.getPathname()
    this.pathnameChangeSubscribers.forEach(callback => callback(newPathname));
  }

  private updateURL(): void {
    if (this.config.reload) window.location.href = this.copyURL().toString()
    else window.history.replaceState({}, '', this.url.href);
  }
}
