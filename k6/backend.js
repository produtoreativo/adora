import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '10s',
  vus: 5,
  thresholds: {
    http_req_duration: ['p(95)<800'],
  },
};

export default function () {
  const res = http.get(`http://${__ENV.ADORA_HOST}/api/health`);
  sleep(1);
}
