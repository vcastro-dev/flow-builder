type EventHandler<T> = (event: T) => Promise<void>;
type EventMap = Map<string, EventHandler<unknown>[]>;

export type EventBus = ReturnType<typeof createEventBus>;

export const createEventBus = () => {
  const handlers: EventMap = new Map();

  const subscribe = (eventName: string, handler: EventHandler<unknown>) => {
    const existingHandler = handlers.get(eventName) || [];
    handlers.set(eventName, [...existingHandler, handler]);
  };

  const publish = async (event: any) => {
    const { name } = event;
    const eventHandlers = handlers.get(name) || [];
    await Promise.all(eventHandlers.map((handler) => handler(event)));
  };

  return { subscribe, publish };
};
