import { API_URL } from './config.js';

export const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
