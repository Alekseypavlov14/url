import { SubscriptionCallback } from './types/subscription-callback'
import { UnsubscribeCallback } from './types/unsubscribe-callback'

export class URLService {
  private url: URL;
  private searchParamsChangeSubscribers: Set<SubscriptionCallback>;
  private hashChangeSubscribers: Set<SubscriptionCallback>;

  constructor() {
    this.url = new URL(window.location.href);

    this.searchParamsChangeSubscribers = new Set();
    this.hashChangeSubscribers = new Set();
  }

  public setSearchParam(key: string, value: string): void {
    this.url.searchParams.set(key, value);

    this.updateURL();
    this.notifySearchParamsChange();
  }

  public getSearchParam(key: string): string | null {
    return this.url.searchParams.get(key);
  }

  public deleteSearchParam(key: string): void {
    this.url.searchParams.delete(key);

    this.updateURL();
    this.notifySearchParamsChange();
  }

  public getSearchParams(): Record<string, string> {
    const params: Record<string, string> = {};

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

  public setHash(hash: string): void {
    this.url.hash = hash;

    this.updateURL();
    this.notifyHashChange();
  }

  public getHash(): string {
    return this.url.hash;
  }

  public copyURL(): URL {
    return new URL(this.url.href);
  }

  public onSearchParamsChange(callback: SubscriptionCallback): UnsubscribeCallback {
    this.searchParamsChangeSubscribers.add(callback);
    return () => this.searchParamsChangeSubscribers.delete(callback);
  }

  public onHashChange(callback: SubscriptionCallback): UnsubscribeCallback {
    this.hashChangeSubscribers.add(callback);
    return () => this.hashChangeSubscribers.delete(callback)
  }

  private notifySearchParamsChange(): void {
    this.searchParamsChangeSubscribers.forEach(callback => callback());
  }

  private notifyHashChange(): void {
    this.hashChangeSubscribers.forEach(callback => callback());
  }

  private updateURL(): void {
    window.history.replaceState({}, '', this.url.href);
  }
}
