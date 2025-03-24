# APM SDK

The APM SDK provides a simple interface for interacting with the [APM Messaging API](https://github.com/TheChessDev/apm_test) from frontend or backend applications.

It exposes three main methods:

```ts
export type Message = {
  id: number;
  name: string;
  createdAt: Date;
  topic: string;
};

export interface SDK {
  listen(
    topic: string,
    callback: (message: Message) => Promise<void>,
  ): Promise<void>;
  send(topic: string, message: { name: string }): Promise<void>;
  list(topic: string): Promise<Message[]>;
}
```

---

## Features

- **listen**: Subscribes to messages on a given topic, spaced by 60s per listener.

- **send**: Publishes a message to a topic.

- **list**: Lists all messages ever sent for a topic.

---

## Getting Started

### 1. Install the SDK

```bash
npm install @chessdev/apm-sdk-demo
```

or

```bash
yarn add @chessdev/apm-sdk-demo
```

---

### 2. Authenticate

#### Option 1: Permanent Token (Recommended for server-to-server)

```ts
import { HttpSDK } from '@chessdev/apm-sdk-demo';

const sdk = new HttpSDK('https://your-api.com', 'your_permanent_token');
```

#### Option 2: OAuth (Optional)

You can also manually perform the GitHub OAuth flow and pass the received `access_token`.

---

## Usage

### Send a message

```ts
await sdk.send('demo-topic', { name: 'Hello world!' });
```

### List messages

```ts
const messages = await sdk.list('demo-topic');
console.log(messages);
```

### Listen for messages

```ts
await sdk.listen('demo-topic', async (message) => {
  console.log('Received:', message.name);
});
```

Messages are delivered to each unique listener **no more than once every 60 seconds**.

---

## Design Notes

- The SDK is designed to **respect the server’s delivery constraints**, so you don’t have to worry about throttling or duplicate filtering.
- `listen()` polls the API every few seconds and processes one message at a time, per listener.
- Listener IDs are generated automatically to ensure uniqueness and avoid collisions.

---

## Testing with the SDK

The SDK is designed to be **fully testable** from frontend or backend apps. For end-to-end testing:

1.  Run the API locally (see [apm-demo-api](https://github.com/TheChessDev/apm_test)).
2.  Use a permanent token for ease of use.
3.  Call `send`, `list`, and `listen` from your test app or script.
