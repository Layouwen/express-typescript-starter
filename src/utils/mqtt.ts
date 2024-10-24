import type { MqttTopicInfo } from '../lib';

export const mqttTopicInfoList = [
  {
    key: 'timeline',
    topic: `/project/emergency/pub/timeline/update`,
    opts: {
      qos: 2,
      retain: false,
    },
    handle: (topic: string, data: any) => {
      console.log('handle data', topic, data);
    },
  },
] as MqttTopicInfo[];
