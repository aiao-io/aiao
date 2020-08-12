export interface CustomEvents {
  [eventName: string]: any;
}

export type EvnetListener<T> = (event?: T[keyof T]) => void;
/**
 * 自定义事件调度器
 */
export abstract class EventDispatcher<Events extends CustomEvents> {
  private m: Map<keyof Events, Set<EvnetListener<Events>>> = new Map();

  private getListener(type: keyof Events): Set<any> {
    const has = this.m.has(type);
    if (has) {
      return this.m.get(type) as any;
    } else {
      const listeners = new Set<any>();
      this.m.set(type, listeners);
      return listeners;
    }
  }

  addEventListener(type: keyof Events, listener: EvnetListener<Events>): void {
    this.getListener(type).add(listener);
  }

  hasEventListener(type: keyof Events, listener: EvnetListener<Events>): boolean {
    return this.m.has(type) && this.getListener(type).has(listener);
  }

  removeEventListener(type: keyof Events, listener: EvnetListener<Events>): void {
    this.getListener(type).delete(listener);
  }

  dispatchEvent(type: keyof Events, event?: Events[keyof Events]): void {
    this.getListener(type).forEach(listener => listener.call(this, event));
  }

  removeAllEventListener(): void {
    this.m.clear();
  }
}
