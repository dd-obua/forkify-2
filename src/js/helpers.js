import { API_URL } from './config.js';
import { TIMEOUT_SECONDS } from './config.js';

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second${s !== 1 ? 's' : ''}.`
        )
      );
    }, s * 1000);
  });
};

export const getData = async (url) => {
  try {
    const promise = fetch(url);
    const res = await Promise.race([promise, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
