export type Message = {
  id: number;
  name: string;
};

export interface SDK {
  listen(
    topic: string,
    callback: (message: Message) => Promise<void>,
  ): Promise<void>;
  send(topic: string, message: { name: string }): Promise<void>;
  list(topic: string): Promise<Message[]>;
}
