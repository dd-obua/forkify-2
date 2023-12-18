import { TIMEOUT_SECONDS } from './config';

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second${s !== 1 ? 's' : ''}`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const request = fetch(url);
    const res = await Promise.race([request, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
