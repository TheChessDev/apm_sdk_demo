import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import type { Message, SDK } from './types';
import { sleep } from './utils';

export class HttpSDK implements SDK {
  private client: AxiosInstance;

  constructor(baseUrl: string, accessToken: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async send(topic: string, message: { name: string }): Promise<void> {
    await this.client.post(`/topics/${topic}/messages`, message);
  }

  async list(topic: string): Promise<Message[]> {
    const res = await this.client.get<Message[]>(`/topics/${topic}/messages`);
    return res.data;
  }

  async listen(
    topic: string,
    callback: (message: Message) => Promise<void>,
  ): Promise<void> {
    const listenerId = uuidv4();

    while (true) {
      try {
        const res = await this.client.get<Message>(
          `/topics/${topic}/messages/next`,
          {
            params: { listenerId },
            validateStatus: (status) => status === 200,
          },
        );

        if (res.data && res.data.id) {
          await callback(res.data);
          await sleep(5000);
        } else {
          await sleep(5000);
        }
      } catch (error) {
        console.error('Error while listening:', error);
        await sleep(5000);
      }
    }
  }
}
