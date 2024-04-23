import mqtt from 'mqtt';
import config from '../../config';
import { logger } from '../../utils';

export class MqttClient {
  private static instance: MqttClient;

  private readonly brokerUrl!: string;
  private readonly opts!: mqtt.IClientOptions;

  private client!: mqtt.MqttClient;
  private topicSubscribeCallbackListMap = new Map<string, any[]>();

  static getInstance() {
    return MqttClient.instance;
  }

  constructor({ brokerUrl = '', opts }: { brokerUrl: string; opts: mqtt.IClientOptions }) {
    if (MqttClient.instance) {
      return MqttClient.instance;
    }

    this.brokerUrl = brokerUrl;
    this.opts = opts;

    MqttClient.instance = this;
  }

  public connect(): Promise<MqttClient> {
    return new Promise((resolve, reject) => {
      const opts = { ...this.opts };

      if (!opts.username) {
        delete opts.username;
      }

      if (!opts.password) {
        delete opts.password;
      }

      this.client = mqtt.connect(this.brokerUrl, opts);

      this.client.on('connect', () => {
        logger.daily.info('mqtt connect success', config.mqtt.url, config.mqtt.opts);

        this.client.on('message', this.onMessageCallback.bind(this));

        resolve(this);
      });

      this.client.on('error', err => {
        logger.error.error('mqtt connect error', err);

        reject(err);
      });
    });
  }

  private onMessageCallback(topic: string, message: Buffer) {
    logger.daily.info('mqtt message', topic, message.toString());

    const callbackList = this.topicSubscribeCallbackListMap.get(topic);

    if (!callbackList) return;

    try {
      if (callbackList.length === 0) {
        return;
      }

      const data = JSON.parse(message.toString());

      callbackList.forEach(callback => callback(topic, data));
    } catch (e) {
      logger.error.error('mqtt message json parse error', e);
    }
  }

  public onSubscribe(mqttTopicInfo: MqttTopicInfo) {
    const { topic, opts, handle } = mqttTopicInfo;

    const handleList = this.topicSubscribeCallbackListMap.get(topic) || [];

    if (!handleList.includes(handle)) {
      this.client.subscribe(topic, opts);
    }

    handleList.push(handle);

    this.topicSubscribeCallbackListMap.set(topic, handleList);
  }

  public onSubscribes(mqttTopicInfoList: MqttTopicInfo[]) {
    mqttTopicInfoList.forEach(mqttTopicInfo => this.onSubscribe(mqttTopicInfo));
  }
}

export interface MqttTopicInfo {
  key: string;
  topic: string;
  opts: {
    qos: 2;
    retain: boolean;
  };
  handle: (topic: string, data: any) => void;
}
