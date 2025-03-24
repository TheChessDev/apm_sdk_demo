# SDK Messaging

This SDK provides a simple interface to interact with the Messaging API. It supports:

- `send(topic, message)`: Sends a message to a given topic.
- `list(topic)`: Lists all messages for a given topic.
- `listen(topic, callback)`: Listens for messages on a given topic and delivers them one-by-one every 60 seconds.

## Installation

```bash
npm install apm-sdk-demo
```
