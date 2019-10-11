export interface CustomEvents {
  [eventName: string]: any;
}
/**
 * 自定义事件调度器
 */
export abstract class EventDispatcher<Events extends CustomEvents> {
  private m: Map<keyof Events, Set<(event: Events[keyof Events]) => void>> = new Map();

  private getListener(type: keyof Events) {
    const has = this.m.has(type);
    if (has) {
      return this.m.get(type);
    } else {
      const listeners = new Set<any>();
      this.m.set(type, listeners);
      return listeners;
    }
  }

  addEventListener(type: keyof Events, listener: (event: Events[keyof Events]) => void): void {
    this.getListener(type).add(listener);
  }

  hasEventListener(type: keyof Events, listener: (event: Events[keyof Events]) => void): boolean {
    return this.m.has(type) && this.getListener(type).has(listener);
  }

  removeEventListener(type: keyof Events, listener: (event: Events[keyof Events]) => void): void {
    this.getListener(type).delete(listener);
  }

  dispatchEvent(type: keyof Events, event?: Events[keyof Events]): void {
    this.getListener(type).forEach(listener => listener.call(this, event));
  }

  removeAllEventListener(): void {
    this.m.clear();
  }
}
